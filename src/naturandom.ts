import type {
  NaturandomInput,
  NaturandomOptions,
  NaturandomOutput,
} from "./naturandom.d";

const DEFAULT_BIAS = 0.7;
const RANDOM_MULTIPLIER = 1597;
const RANDOM_INCREMENT = 51749;
const RANDOM_MODULUS = 244944;

const createSeededRandom = (seed: number) => {
  let currentSeed = Math.abs(seed);

  return () => {
    currentSeed =
      (RANDOM_MULTIPLIER * currentSeed + RANDOM_INCREMENT) % RANDOM_MODULUS;
    const transform1 = currentSeed;

    currentSeed =
      (RANDOM_MULTIPLIER * currentSeed + RANDOM_INCREMENT) % RANDOM_MODULUS;
    const transform2 = currentSeed;

    const combined = (transform1 * transform2 + seed) % RANDOM_MODULUS;

    return combined / RANDOM_MODULUS;
  };
};

const normalizeInput = <T>(
  input: NaturandomInput<T>
): [any[], "array" | "string" | "object"] => {
  if (Array.isArray(input)) {
    return [[...input], "array"];
  }

  if (typeof input === "string") {
    return [input.split(""), "string"];
  }

  return [Object.entries(input), "object"];
};

const createClusters = <T>(
  items: Array<T>,
  clusterSize: number
): Array<Array<T>> => {
  return Array.from({ length: Math.ceil(items.length / clusterSize) }, (_, i) =>
    items.slice(i * clusterSize, (i + 1) * clusterSize)
  );
};

const shuffleWithRandom = <U>(
  items: Array<U>,
  random: () => number
): Array<U> => {
  return items
    .map((item) => ({ item, sort: random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

export const naturandom = <T>(
  input: NaturandomInput<T>,
  options: NaturandomOptions = {}
): NaturandomOutput<T> => {
  const { seed = Date.now(), count, bias = DEFAULT_BIAS } = options;

  if (typeof input === "string" && input.length === 0) {
    return "" as NaturandomOutput<T>;
  }

  if (typeof input === "string" && input.length === 1) {
    return input as NaturandomOutput<T>;
  }

  if (typeof count === "number" && count <= 0) {
    if (typeof input === "string") {
      return "" as NaturandomOutput<T>;
    }
    if (Array.isArray(input)) {
      return [] as unknown as NaturandomOutput<T>;
    }
    return [] as unknown as NaturandomOutput<T>;
  }

  const [items, inputType] = normalizeInput(input);

  if (items.length === 0) {
    if (inputType === "string") {
      return "" as NaturandomOutput<T>;
    }
    return [] as unknown as NaturandomOutput<T>;
  }

  const random = createSeededRandom(seed);

  const clusterSize = Math.max(1, Math.floor(items.length * bias));
  const clusters = createClusters(items, clusterSize);

  const shuffledItems = shuffleWithRandom(
    clusters.map((cluster) => shuffleWithRandom(cluster, random)),
    random
  ).flat();

  const result = count ? shuffledItems.slice(0, count) : shuffledItems;

  if (inputType === "string") {
    return result.join("") as NaturandomOutput<T>;
  }

  return result as NaturandomOutput<T>;
};

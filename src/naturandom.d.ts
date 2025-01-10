/**
 * Represents any valid input type that naturandom can process:
 * - Arrays of any type
 * - Strings (which are treated as arrays of characters)
 * - Objects (which will be randomized as key-value pairs)
 */
export type NaturandomInput<T> = T[] | string | Record<string, T>;

/**
 * Configuration options for controlling the randomization behavior
 */
export interface NaturandomOptions {
  /**
   * A numerical seed for deterministic randomization
   * The same seed will always produce the same shuffle sequence
   * @default Date.now()
   */
  seed?: number;

  /**
   * Maximum number of items to return in the result
   * Must be less than or equal to the input length
   */
  count?: number;

  /**
   * Controls how "natural" the randomization feels
   * - 0.0: Pure random (like Math.random())
   * - 1.0: Maximum natural feel (more clustered)
   * @default 0.7
   */
  bias?: number;
}

/**
 * The return type varies based on the input type:
 * - Arrays return shuffled arrays of the same type
 * - Strings return shuffled strings
 * - Objects return arrays of [key, value] tuples
 */
export type NaturandomOutput<T> = T extends string
  ? string
  : T extends any[]
  ? T
  : T extends Record<string, infer V>
  ? Array<[string, V]>
  : never;

import { describe, it, expect } from "vitest";
import { naturandom } from "../dist/naturandom.es";

describe("naturandom - Input Type Handling", () => {
  describe("When processing arrays", () => {
    it("should maintain all original elements in shuffled array", () => {
      const input = [1, 2, 3, 4, 5];
      const result = naturandom(input, { seed: 123 });
      expect(result).toHaveLength(input.length);
      expect(new Set(result)).toEqual(new Set(input));
    });
  });

  describe("When processing strings", () => {
    it("should maintain all original characters in shuffled string", () => {
      const input = "hello";
      const result = naturandom(input, { seed: 123 });
      expect(result).toHaveLength(input.length);
      expect([...result].sort().join("")).toBe([...input].sort().join(""));
    });
  });

  describe("When processing objects", () => {
    it("should convert to key-value pairs while preserving all entries", () => {
      const input = { a: 1, b: 2, c: 3 };
      const result = naturandom(input, { seed: 123 });
      expect(result).toHaveLength(Object.entries(input).length);
      expect(Object.fromEntries(result)).toEqual(input);
    });
  });
});

describe("naturandom - Bias/Clustering Behavior", () => {
  describe("When using different bias values", () => {
    it("should generate different distributions for high vs low bias", () => {
      const input = Array.from({ length: 100 }, (_, i) => i);
      const highBiasResult = naturandom(input, { bias: 0.9, seed: 123 });
      const lowBiasResult = naturandom(input, { bias: 0.1, seed: 123 });

      expect(highBiasResult).not.toEqual(lowBiasResult);
      expect(highBiasResult).not.toEqual(input);
    });

    it("should accept bias values at extremes (0 and 1)", () => {
      const input = [1, 2, 3, 4, 5];
      expect(() => naturandom(input, { bias: 0 })).not.toThrow();
      expect(() => naturandom(input, { bias: 1 })).not.toThrow();
    });
  });
});

describe("naturandom - Count Limitation", () => {
  describe("When specifying output size", () => {
    it("should return exactly the requested number of items", () => {
      const input = [1, 2, 3, 4, 5];
      const result = naturandom(input, { count: 3, seed: 123 });
      expect(result).toHaveLength(3);

      result.forEach((item) => expect(input).toContain(item));
    });

    it("should return full input length when requested count exceeds input size", () => {
      const input = [1, 2, 3];
      const result = naturandom(input, { count: 5, seed: 123 });
      expect(result).toHaveLength(input.length);
    });
  });
});

describe("naturandom - Seed Determinism", () => {
  describe("When using the same seed", () => {
    it("should produce identical outputs across multiple calls", () => {
      const input = [1, 2, 3, 4, 5];
      const result1 = naturandom(input, { seed: 123 });
      const result2 = naturandom(input, { seed: 123 });
      expect(result1).toEqual(result2);
    });
  });

  describe("When using different seeds", () => {
    it("should produce different outputs for different seed values", () => {
      const input = [1, 2, 3, 4, 5];
      const result1 = naturandom(input, { seed: 123 });
      const result2 = naturandom(input, { seed: 456 });
      expect(result1).not.toEqual(result2);
    });
  });
});

describe("naturandom - Edge Cases", () => {
  describe("When handling empty inputs", () => {
    it("should return empty array for empty array input", () => {
      expect(naturandom([])).toEqual([]);
    });

    it("should return empty string for empty string input", () => {
      expect(naturandom("")).toBe("");
    });

    it("should return empty array for empty object input", () => {
      expect(naturandom({})).toEqual([]);
    });
  });

  describe("When handling single-item inputs", () => {
    it("should return same single item for array input", () => {
      expect(naturandom([1])).toEqual([1]);
    });

    it("should return same single character for string input", () => {
      expect(naturandom("a")).toBe("a");
    });

    it("should return single key-value pair for single-property object", () => {
      expect(naturandom({ key: "value" })).toEqual([["key", "value"]]);
    });
  });

  describe("When handling invalid count values", () => {
    it("should return empty array for zero count", () => {
      const input = [1, 2, 3];
      expect(naturandom(input, { count: 0 })).toEqual([]);
    });

    it("should return empty array for negative count", () => {
      const input = [1, 2, 3];
      expect(naturandom(input, { count: -1 })).toEqual([]);
    });
  });
});

describe("naturandom - Complex Scenarios", () => {
  describe("When handling complex nested data structures", () => {
    it("should maintain data integrity with object of arrays, high bias, and single return", () => {
      // Complex input data: Object containing arrays of user activity data
      const input = {
        recentLogins: [
          { userId: 1, timestamp: "2024-01-01", device: "mobile" },
          { userId: 1, timestamp: "2024-01-02", device: "desktop" },
          { userId: 1, timestamp: "2024-01-03", device: "mobile" },
        ],
        searchHistory: [
          { term: "typescript", date: "2024-01-01" },
          { term: "javascript", date: "2024-01-01" },
          { term: "react", date: "2024-01-02" },
          { term: "vue", date: "2024-01-02" },
        ],
        purchases: [
          { id: "p1", amount: 99.99, date: "2024-01-01" },
          { id: "p2", amount: 149.99, date: "2024-01-01" },
          { id: "p3", amount: 199.99, date: "2024-01-02" },
        ],
      };

      // Test with very high bias (0.9) to ensure strong clustering
      // and return only one entry
      const result = naturandom(input, {
        bias: 0.9,
        count: 1,
        seed: 12345,
      });

      // Assertions
      expect(result).toHaveLength(1);

      const [key, value] = result[0];

      // Key should be one of the original keys
      expect(["recentLogins", "searchHistory", "purchases"]).toContain(key);

      // Value should be the complete array for that key
      const originalArray = input[key];
      expect(value).toEqual(originalArray);

      // Verify array contents are preserved
      if (key === "recentLogins") {
        expect(value).toHaveLength(3);
        expect(value[0]).toHaveProperty("userId");
        expect(value[0]).toHaveProperty("timestamp");
        expect(value[0]).toHaveProperty("device");
      } else if (key === "searchHistory") {
        expect(value).toHaveLength(4);
        expect(value[0]).toHaveProperty("term");
        expect(value[0]).toHaveProperty("date");
      } else if (key === "purchases") {
        expect(value).toHaveLength(3);
        expect(value[0]).toHaveProperty("id");
        expect(value[0]).toHaveProperty("amount");
        expect(value[0]).toHaveProperty("date");
      }

      // Verify deterministic behavior
      const secondResult = naturandom(input, {
        bias: 0.9,
        count: 1,
        seed: 12345,
      });
      expect(result).toEqual(secondResult);

      // Verify different seed gives different result
      const differentSeedResult = naturandom(input, {
        bias: 0.9,
        count: 1,
        seed: 54321,
      });
      expect(result).not.toEqual(differentSeedResult);
    });
  });
});

describe("naturandom - Full Coverage Edge Cases", () => {
  describe("When handling empty inputs with count option", () => {
    it("should handle empty string with count", () => {
      expect(naturandom("", { count: 5 })).toBe("");
    });

    it("should handle empty array with count", () => {
      expect(naturandom([], { count: 5 })).toEqual([]);
    });

    it("should handle empty object with count", () => {
      expect(naturandom({}, { count: 5 })).toEqual([]);
    });
  });

  describe("When handling single item inputs with count option", () => {
    it("should handle single character string with count", () => {
      expect(naturandom("a", { count: 5 })).toBe("a");
    });

    it("should handle single item array with count", () => {
      expect(naturandom([1], { count: 5 })).toEqual([1]);
    });

    it("should handle single entry object with count", () => {
      const result = naturandom({ a: 1 }, { count: 5 });
      expect(result).toEqual([["a", 1]]);
    });
  });

  describe("When handling bias edge cases", () => {
    it("should handle bias of 0", () => {
      const input = [1, 2, 3, 4, 5];
      const result = naturandom(input, { bias: 0, seed: 123 });
      expect(result).toHaveLength(input.length);
      expect(new Set(result)).toEqual(new Set(input));
    });

    it("should handle bias of 1", () => {
      const input = [1, 2, 3, 4, 5];
      const result = naturandom(input, { bias: 1, seed: 123 });
      expect(result).toHaveLength(input.length);
      expect(new Set(result)).toEqual(new Set(input));
    });

    it("should handle negative bias", () => {
      const input = [1, 2, 3, 4, 5];
      const result = naturandom(input, { bias: -0.5, seed: 123 });
      expect(result).toHaveLength(input.length);
      expect(new Set(result)).toEqual(new Set(input));
    });

    it("should handle bias greater than 1", () => {
      const input = [1, 2, 3, 4, 5];
      const result = naturandom(input, { bias: 1.5, seed: 123 });
      expect(result).toHaveLength(input.length);
      expect(new Set(result)).toEqual(new Set(input));
    });
  });
});

describe("naturandom - Specific Code Path Coverage", () => {
  describe("When handling zero/negative counts", () => {
    it("should return empty string for string input with count zero", () => {
      expect(naturandom("hello", { count: 0 })).toBe("");
    });

    it("should return empty array for array input with count zero", () => {
      expect(naturandom([1, 2, 3], { count: 0 })).toEqual([]);
    });

    it("should return empty array for object input with count zero", () => {
      expect(naturandom({ a: 1, b: 2 }, { count: 0 })).toEqual([]);
    });

    it("should return empty string for string input with negative count", () => {
      expect(naturandom("hello", { count: -1 })).toBe("");
    });

    it("should return empty array for array input with negative count", () => {
      expect(naturandom([1, 2, 3], { count: -1 })).toEqual([]);
    });

    it("should return empty array for object input with negative count", () => {
      expect(naturandom({ a: 1, b: 2 }, { count: -1 })).toEqual([]);
    });
  });

  describe("When handling empty inputs after normalization", () => {
    it("should return empty string for string input that normalizes to empty", () => {
      expect(naturandom("")).toBe("");
    });

    it("should return empty array for array input that normalizes to empty", () => {
      expect(naturandom([])).toEqual([]);
    });

    it("should return empty array for object input that normalizes to empty", () => {
      expect(naturandom({})).toEqual([]);
    });
  });
});

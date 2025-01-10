# Naturandom

A utility for natural-feeling randomization that maintains clustering patterns. Unlike pure random shuffling, Naturandom creates more natural-looking distributions by keeping some elements clustered together.

## Why Use Naturandom?

Pure randomization often doesn't feel "natural" to users. Consider a music playlist shuffle:

```javascript
// Pure random might give you:
[
  "Heavy Metal Song",
  "Classical Piano", // Jarring transition
  "Heavy Metal Song",
  "Soft Jazz", // Another jarring transition
  "Heavy Metal Song",
];

// Naturandom gives you more natural grouping:
naturandom(playlist, { bias: 0.7 });
[
  "Heavy Metal Song",
  "Heavy Metal Song", // Similar songs stay closer
  "Soft Jazz",
  "Classical Piano",
  "Heavy Metal Song",
];
```

### Real-World Use Cases

- **Music Playlist Shuffling**: Keep similar genres loosely grouped while maintaining randomness
- **Photo Gallery Randomization**: Group photos from similar dates/events while still mixing the overall order
- **Menu Item Randomization**: Keep food categories somewhat together while varying the presentation
- **Game Level Generation**: Cluster similar difficulty levels for smoother progression
- **Test Question Shuffling**: Keep related topics somewhat grouped while maintaining randomization

## Installation

```bash
pnpm add naturandom
```

## Usage

```typescript
import { naturandom } from "naturandom";

// Basic array shuffling
const numbers = [1, 2, 3, 4, 5];
naturandom(numbers);

// String shuffling
naturandom("hello");

// Object entry shuffling
naturandom({ a: 1, b: 2, c: 3 });

// With options
naturandom(numbers, {
  seed: 12345, // For deterministic results
  count: 3, // Limit output size
  bias: 0.7, // Control clustering (0.0 to 1.0)
});
```

## API

### `naturandom<T>(input: NaturandomInput<T>, options?: NaturandomOptions): NaturandomOutput<T>`

#### Input Types

- Arrays: `T[]`
- Strings: `string`
- Objects: `Record<string, T>`

#### Options

- `seed`: number (default: current timestamp)
  - Seed for deterministic randomization
- `count`: number (optional)
  - Maximum number of items to return
- `bias`: number (default: 0.7)
  - 0.0: Pure random (like Math.random())
  - 1.0: Maximum clustering
  - Values in between control the "naturalness" of the distribution

#### Return Types

- For arrays: `T[]`
- For strings: `string`
- For objects: `Array<[string, T]>`

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## How It Works

Naturandom creates natural-feeling randomization by:

1. Dividing the input into clusters based on the bias value
2. Shuffling elements within each cluster
3. Shuffling the clusters themselves
4. Flattening the result

This creates a distribution that maintains some local patterns while still providing randomization.

## License

ISC

import { useState } from "react";
import { naturandom } from "../../../dist/naturandom.es";
import "./App.css";

// Create 36 items with strong relationships between them
const items = [
  // Music playlist (songs from same genre/artist stay together)
  {
    name: "Stairway to Heaven",
    group: "Rock",
    artist: "Led Zeppelin",
    style: "Classic Rock",
  },
  {
    name: "Kashmir",
    group: "Rock",
    artist: "Led Zeppelin",
    style: "Classic Rock",
  },
  {
    name: "Black Dog",
    group: "Rock",
    artist: "Led Zeppelin",
    style: "Classic Rock",
  },
  {
    name: "Smells Like Teen Spirit",
    group: "Rock",
    artist: "Nirvana",
    style: "Grunge",
  },
  { name: "Lithium", group: "Rock", artist: "Nirvana", style: "Grunge" },
  {
    name: "Come As You Are",
    group: "Rock",
    artist: "Nirvana",
    style: "Grunge",
  },

  // Classical music stays together
  {
    name: "Symphony No. 5",
    group: "Classical",
    artist: "Beethoven",
    style: "Symphony",
  },
  {
    name: "Symphony No. 9",
    group: "Classical",
    artist: "Beethoven",
    style: "Symphony",
  },
  {
    name: "Moonlight Sonata",
    group: "Classical",
    artist: "Beethoven",
    style: "Sonata",
  },
  {
    name: "The Four Seasons",
    group: "Classical",
    artist: "Vivaldi",
    style: "Concerto",
  },
  { name: "Spring", group: "Classical", artist: "Vivaldi", style: "Concerto" },
  { name: "Summer", group: "Classical", artist: "Vivaldi", style: "Concerto" },

  // Jazz section
  {
    name: "Take Five",
    group: "Jazz",
    artist: "Dave Brubeck",
    style: "Cool Jazz",
  },
  {
    name: "Blue Rondo",
    group: "Jazz",
    artist: "Dave Brubeck",
    style: "Cool Jazz",
  },
  {
    name: "Strange Meadow Lark",
    group: "Jazz",
    artist: "Dave Brubeck",
    style: "Cool Jazz",
  },
  {
    name: "So What",
    group: "Jazz",
    artist: "Miles Davis",
    style: "Modal Jazz",
  },
  {
    name: "Blue in Green",
    group: "Jazz",
    artist: "Miles Davis",
    style: "Modal Jazz",
  },
  {
    name: "All Blues",
    group: "Jazz",
    artist: "Miles Davis",
    style: "Modal Jazz",
  },

  // Electronic music
  {
    name: "Get Lucky",
    group: "Electronic",
    artist: "Daft Punk",
    style: "House",
  },
  {
    name: "Around the World",
    group: "Electronic",
    artist: "Daft Punk",
    style: "House",
  },
  {
    name: "One More Time",
    group: "Electronic",
    artist: "Daft Punk",
    style: "House",
  },
  {
    name: "Strobe",
    group: "Electronic",
    artist: "Deadmau5",
    style: "Progressive",
  },
  {
    name: "Ghosts n Stuff",
    group: "Electronic",
    artist: "Deadmau5",
    style: "Progressive",
  },
  {
    name: "Faxing Berlin",
    group: "Electronic",
    artist: "Deadmau5",
    style: "Progressive",
  },

  // Hip Hop
  { name: "Lose Yourself", group: "Hip Hop", artist: "Eminem", style: "Rap" },
  { name: "Stan", group: "Hip Hop", artist: "Eminem", style: "Rap" },
  {
    name: "The Real Slim Shady",
    group: "Hip Hop",
    artist: "Eminem",
    style: "Rap",
  },
  {
    name: "N.Y. State of Mind",
    group: "Hip Hop",
    artist: "Nas",
    style: "East Coast",
  },
  {
    name: "The World Is Yours",
    group: "Hip Hop",
    artist: "Nas",
    style: "East Coast",
  },
  {
    name: "Life's a Bitch",
    group: "Hip Hop",
    artist: "Nas",
    style: "East Coast",
  },

  // Pop music
  { name: "Shake It Off", group: "Pop", artist: "Taylor Swift", style: "Pop" },
  { name: "Bad Blood", group: "Pop", artist: "Taylor Swift", style: "Pop" },
  { name: "Blank Space", group: "Pop", artist: "Taylor Swift", style: "Pop" },
  { name: "Shape of You", group: "Pop", artist: "Ed Sheeran", style: "Pop" },
  { name: "Perfect", group: "Pop", artist: "Ed Sheeran", style: "Pop" },
  {
    name: "Thinking Out Loud",
    group: "Pop",
    artist: "Ed Sheeran",
    style: "Pop",
  },
];

function App() {
  const [bias, setBias] = useState(0.7);
  const [seed, setSeed] = useState(Date.now());

  const naturalRandom = naturandom(items, { bias, seed });
  const pureRandom = [...items].sort(() => Math.random() - 0.5);

  return (
    <div className="grid">
      <h1 className="grid__title">Music Playlist Shuffling</h1>

      <div className="grid__controls">
        <label className="grid__label">
          Clustering Bias: {bias}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={bias}
            onChange={(e) => setBias(Number(e.target.value))}
            className="grid__slider"
          />
        </label>

        <button className="grid__button" onClick={() => setSeed(Date.now())}>
          Shuffle Again
        </button>
      </div>

      <div className="grid__container">
        <div className="grid__section">
          <h2 className="grid__section-title">
            Natural Random (maintains flow)
          </h2>
          <div className="grid__matrix">
            {naturalRandom.map((item, i) => (
              <div
                key={i}
                className={`grid__cell grid__cell--${item.group
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <div className="grid__cell-name">{item.name}</div>
                <div className="grid__cell-type">{item.artist}</div>
                <div className="grid__cell-tier">{item.style}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid__section">
          <h2 className="grid__section-title">
            Pure Random (jarring transitions)
          </h2>
          <div className="grid__matrix">
            {pureRandom.map((item, i) => (
              <div
                key={i}
                className={`grid__cell grid__cell--${item.group
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <div className="grid__cell-name">{item.name}</div>
                <div className="grid__cell-type">{item.artist}</div>
                <div className="grid__cell-tier">{item.style}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

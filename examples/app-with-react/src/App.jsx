import { useState } from "react";
import { naturandom } from "naturandom";

/**
 * @typedef {Object} Product
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} brand - Brand name
 * @property {number} price - Price in USD
 * @property {string} category - Product category
 * @property {string} color - Primary color
 */

/** @type {Product[]} */
const products = [
  {
    id: "1",
    name: "Alpine Down Jacket",
    brand: "North Face",
    price: 299,
    category: "Jackets",
    color: "Black",
  },
  {
    id: "2",
    name: "Arctic Parka",
    brand: "North Face",
    price: 279,
    category: "Jackets",
    color: "Navy",
  },
  {
    id: "3",
    name: "Snowboard Jacket",
    brand: "Burton",
    price: 189,
    category: "Jackets",
    color: "Blue",
  },
  {
    id: "4",
    name: "Ski Jacket",
    brand: "Burton",
    price: 199,
    category: "Jackets",
    color: "Red",
  },
  {
    id: "5",
    name: "Light Shell",
    brand: "Patagonia",
    price: 89,
    category: "Jackets",
    color: "Green",
  },
  {
    id: "6",
    name: "Rain Shell",
    brand: "Patagonia",
    price: 99,
    category: "Jackets",
    color: "Yellow",
  },
  // ... imagine 50+ more items
];

function App() {
  const [displayProducts, setDisplayProducts] = useState(
    /** @type {Product[]} */ ([])
  );

  const showProducts = (bias) => {
    // In real world, this would fetch from an API with the bias parameter
    const shuffled = naturandom(products, { bias });
    setDisplayProducts(shuffled);
  };

  return (
    <div>
      <h2>Winter Jackets</h2>
      <div>
        <button onClick={() => showProducts(0)}>Pure Random (Bad UX)</button>
        <button onClick={() => showProducts(0.7)}>
          Natural Grouping (Good UX)
        </button>
        <button onClick={() => showProducts(1)}>
          Full Grouping (Monotonous)
        </button>
      </div>

      {displayProducts.map((product) => (
        <div key={product.id}>
          {product.brand} - {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
}

export default App;

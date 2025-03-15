import React from "react";
import "./Products.css"; // Style for the products section

const Products = () => {
  // Grouping products into categories
  const categories = {
    "Cleaning Supplies": [
      {
        id: 1,
        title: "Detergent",
        description: "High-quality detergent for spotless cleaning.",
        image: "https://via.placeholder.com/150", // Replace with actual image URL
      },
      {
        id: 2,
        title: "Paper Towels",
        description: "Eco-friendly paper towels for all your cleaning needs.",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        title: "Scrubbers",
        description: "Durable scrubbers for tough stains and surfaces.",
        image: "https://via.placeholder.com/150",
      },
    ],
    "Personal Care": [
      {
        id: 4,
        title: "Toothpaste",
        description: "Fluoride-free toothpaste for healthy teeth.",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 5,
        title: "Reusable Deodorant",
        description: "Eco-friendly deodorant with a refreshing scent.",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 6,
        title: "Shampoo",
        description: "Organic shampoo for all hair types.",
        image: "https://via.placeholder.com/150",
      },
    ],
  };

  return (
    <div className="products">
      <h2>Our Products</h2>
      {/* Render categories dynamically */}
      {Object.entries(categories).map(([categoryName, products]) => (
        <div key={categoryName} className="category">
          <h3>{categoryName}</h3>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} className="product-image" />
                <h4>{product.title}</h4>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

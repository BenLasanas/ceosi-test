import React, { useState } from "react";
import createProductAPI from "../api/createProductAPI";
import "../styles/CreateProduct.css";
const CreateProduct = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleCreateProduct = async () => {
    try {
      const productData = { name, slug, description, price };
      const createdProduct = await createProductAPI(productData);
      console.log("Product created successfully!", createdProduct);
      // Handle success, show success message, etc.
    } catch (error) {
      console.error("Failed to create product:", error.message);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <div className="input-container">
        <div className="input-field">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>Desc:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="create-button" onClick={handleCreateProduct}>
          Create Product
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;

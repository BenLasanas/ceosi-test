import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../api/useAuth";
import updateProductAPI from "../api/updateProductAPI";
import deleteProductAPI from "../api/deleteProductAPI";
import CreateProduct from "./CreateProduct";
import "../styles/Products.css";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const { token } = useAuth();
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-001.emberspec.com/api/products/",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!Array.isArray(response.data)) {
          throw new Error("Failed to fetch products.");
        }

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleToggleCreateProduct = () => {
    setShowCreateProduct((prevValue) => !prevValue);
  };

  const handleSearch = () => {
    const idToSearch = parseInt(searchId, 10);

    const filteredProducts = products.filter(
      (product) => product.id === idToSearch
    );

    setProducts(filteredProducts);
  };

  const handleResetSearch = () => {
    setSearchId("");
    fetchData();
  };

  const handleUpdateProduct = async (id, updatedProductData) => {
    try {
      const updatedProduct = await updateProductAPI(
        id,
        updatedProductData,
        token
      );
      console.log("Product updated successfully!", updatedProduct);

      fetchData();
    } catch (error) {
      console.error("Failed to update product:", error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProductAPI(id, token);
      console.log("Product deleted successfully!");

      fetchData();
    } catch (error) {
      console.error("Failed to delete product:", error.message);
    }
  };

  return (
    <div className="main-container">
      <h1>Products</h1>
      <button className="show-button" onClick={handleToggleCreateProduct}>
        {showCreateProduct ? "Hide Create Product" : "Create New Product"}
      </button>
      {showCreateProduct && <CreateProduct />}
      <div>
        <input
          className="search-field"
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter ID to search"
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
        <button className="search-button" onClick={handleResetSearch}>
          ⭕
        </button>
      </div>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.slug}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    onClick={() => {
                      const updatedData = {
                        name: "Updated Name",
                        slug: "updated-slug",
                        description: "Updated Description",
                        price: "Updated Price",
                      };
                      handleUpdateProduct(product.id, updatedData);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

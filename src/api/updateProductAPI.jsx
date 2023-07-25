import axios from "axios";

const updateProductAPI = async (id, updatedProductData, token) => {
  const apiUrl = `https://api-001.emberspec.com/api/products/:${id}`;

  try {
    const response = await axios.put(apiUrl, updatedProductData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Product updated successfully!");
      return response.data;
    } else {
      throw new Error("Failed to update product.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateProductAPI;

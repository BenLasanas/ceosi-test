import axios from "axios";

const createProductAPI = async (productData) => {
  const apiUrl = "https://api-001.emberspec.com/api/products";

  try {
    const response = await axios.post(apiUrl, productData);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create product.");
    }
  } catch (error) {
    throw new Error("Failed to create product.");
  }
};

export default createProductAPI;

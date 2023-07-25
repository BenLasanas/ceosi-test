import axios from "axios";

const getProducts = async (token) => {
  const apiUrl = "https://api-001.emberspec.com/api/products/";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error("Failed to fetch products.");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products.");
  }
};

export default getProducts;

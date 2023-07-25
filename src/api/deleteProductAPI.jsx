import axios from "axios";

const deleteProductAPI = async (id, token) => {
  const apiUrl = `https://api-001.emberspec.com/api/products/${id}`;

  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Product deleted successfully!");
      return response.data;
    } else {
      throw new Error("Failed to delete product.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteProductAPI;

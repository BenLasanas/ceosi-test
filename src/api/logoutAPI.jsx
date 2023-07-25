import axios from "axios";

const logoutAPI = async (token) => {
  const apiUrl = "https://api-001.emberspec.com/api/logout";

  try {
    const response = await axios.post(apiUrl, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error) {
    throw new Error("Logout failed. Please try again later.");
  }
};

export default logoutAPI;

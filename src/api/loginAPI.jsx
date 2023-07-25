import axios from "axios";

const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(
      "https://api-001.emberspec.com/api/login",
      {
        email,
        password,
      }
    );

    if (!response.data || !response.data.token) {
      throw new Error("Invalid response from server");
    }

    const { token } = response.data;
    return token;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

export default loginAPI;

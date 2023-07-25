import axios from "axios";

const registerAPI = async (name, email, password) => {
  const apiUrl = "https://api-001.emberspec.com/api/register";

  try {
    const response = await axios.post(apiUrl, {
      name,
      email,
      password,
      password_confirmation: password,
    });

    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error) {
    throw new Error("Registration failed. Please try again later.");
  }
};

export default registerAPI;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../api/useAuth";
import Products from "./Products";
import logoutAPI from "../api/logoutAPI";
import "../styles/Home.css";
const Home = () => {
  const navigate = useNavigate();
  const { authenticated, token, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutAPI(token);
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="home-page">
      <h1>Dashboard</h1>
      {authenticated && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
      <Products />
    </div>
  );
};

export default Home;

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import useAuth from "./api/useAuth";

const App = () => {
  const { authenticated, login } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={authenticated ? <Home /> : <Login onLogin={login} />}
      />
      {authenticated ? <Route path="/home" element={<Home />} /> : null}
    </Routes>
  );
};

export default App;

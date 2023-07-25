import "../styles/Login.css";
import React, { useState, useEffect } from "react";
import loginAPI from "../api/loginAPI";
import registerAPI from "../api/registerAPI";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../api/useAuth";
const Login = ({ onLogin }) => {
  const [isLoginVisible, setLoginVisible] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleToggleForm = () => {
    setLoginVisible(!isLoginVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const token = await loginAPI(email, password);
      if (token) {
        onLogin(token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !passwordConfirmation) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== passwordConfirmation || password.length < 4) {
      alert(
        "Password must be at least 4 characters long and match the confirmation."
      );
      return;
    }

    try {
      const response = await registerAPI(
        fullName,
        email,
        password,
        passwordConfirmation
      );

      alert("Registration successful, you may now Log-in");
    } catch (error) {
      alert("Registration error:", error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        {isLoginVisible ? (
          <form onSubmit={handleLogin}>
            <div className="field-container">
              <h2>Login</h2>
              <input
                className="input-field"
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-button" type="submit">
                Log In
              </button>
            </div>
            <div className="toggle-form">
              Don't have an account?{" "}
              <button onClick={handleToggleForm}>Register</button>
            </div>
          </form>
        ) : (
          <div>
            <form onSubmit={handleRegister}>
              <div className="field-container">
                <h2>Register</h2>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password Confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <button
                  className="signup-button"
                  type="submit"
                  disabled={
                    password !== passwordConfirmation || password.length < 4
                  }
                >
                  Sign Up
                </button>
              </div>
              <div className="toggle-form">
                Already have an account?{" "}
                <button onClick={handleToggleForm}>Log In</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

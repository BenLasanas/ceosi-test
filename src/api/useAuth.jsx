import { useState, useEffect } from "react";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("authenticated") === "true"
  );

  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  useEffect(() => {
    sessionStorage.setItem("authenticated", authenticated);
    sessionStorage.setItem("token", token);
  }, [authenticated, token]);

  const login = (receivedToken) => {
    setAuthenticated(true);
    setToken(receivedToken);
  };

  const logout = () => {
    setAuthenticated(false);
    setToken("");
  };

  return { authenticated, token, login, logout };
};

export default useAuth;

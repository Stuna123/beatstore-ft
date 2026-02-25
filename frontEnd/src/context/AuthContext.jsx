/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      console.error("Erreur !");
      return null;
    }
  });

  const isAuthentificated = !!user;
  const isAdmin = user?.role === "admin"

  const login = async (email, password) => {
    const res = await api.post("auth/login", { email, password });

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user)
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    setUser(null);
  }

  //const isAuthentificated = !!user;
  //const isAdmin = user?.role === "admin";

    return (
    <AuthContext.Provider
        value={{ user, login, logout, isAuthentificated, isAdmin}}
    >
        { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
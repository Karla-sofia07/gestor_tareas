import { createContext, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await api.post("/login", { email, password });
      setUser(res.data);
    } catch (error) {
      throw "Error al iniciar sesión";
    }
  };

  const register = async (data) => {
    try {
      await api.post("/register", data);
    } catch {
      throw "Error en registro";
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
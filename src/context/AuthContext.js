import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  // Example format:
  // user = { name: "Lilian", role: "admin" }

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("cirt_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cirt_user");
  };

  // load user from localStorage on refresh
  useState(() => {
    const saved = localStorage.getItem("cirt_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  });

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

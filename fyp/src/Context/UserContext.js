import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Optional: fetch user data if token exists
    if (token) {
      // You can use jwt-decode or fetch from backend
      // setEmail(decoded.email);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

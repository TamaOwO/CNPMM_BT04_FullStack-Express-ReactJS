import { createContext, useState } from 'react'
import { useEffect } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        name: "",
    },
    appLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: { email: "", name: "" },
  });

  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetch("http://localhost:8080/api/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
            console.log("Get me data: ", data);
          setAuth({
            isAuthenticated: true,
            user: { email: data.email ?? "", name: data.name ?? "" },
          });
        })
        .catch(() => {
          localStorage.removeItem("access_token");
          setAuth({ isAuthenticated: false, user: { email: "", name: "" } });
        })
        .finally(() => {
          setAppLoading(false);
        });
    } else {
      setAppLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
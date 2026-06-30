import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const user = localStorage.getItem("userInfo");

    return user ? JSON.parse(user) : null;
  });

  const login = (userData) => {
    setUserInfo(userData);

    localStorage.setItem(
      "userInfo",
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    setUserInfo(null);

    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
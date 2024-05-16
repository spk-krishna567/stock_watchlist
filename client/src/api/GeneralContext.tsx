import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { stringify } from "querystring";

interface User {
  _id: string;
  id: string;
  usertype: string;
  username: string;
  email: string;
  balance: number;
}

interface GeneralContextType {
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  usertype: string;
  setUsertype: React.Dispatch<React.SetStateAction<string>>;
}

export const GeneralContext = createContext<GeneralContextType>(null!);

const GeneralContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");

  const navigate = useNavigate();

  const login = async (): Promise<void> => {
    try {
      const loginInputs = { email, password };
      const res = await axios.post<User>(
        "http://127.0.0.1:8000/login",
        loginInputs
      );
      const userData = res.data;
      console.log(res.data);

      localStorage.setItem("userId", userData._id);
      localStorage.setItem("userType", userData.usertype);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("email", userData.email);

      if (userData.usertype === "customer") {
        navigate("/home");
      } else if (userData.usertype === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  const register = async (): Promise<void> => {
    try {
      const inputs = { username, email, usertype, password };
      const res = await axios.post<User>(
        "http://127.0.0.1:8000/register",
        inputs
      );
      const userData = res.data;
      console.log(res.data);

      localStorage.setItem("userId", userData.id);
      localStorage.setItem("userType", userData.usertype);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("email", userData.email);

      if (userData.usertype === "customer") {
        navigate("/home");
      } else if (userData.usertype === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  const logout = (): void => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <GeneralContext.Provider
      value={{
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

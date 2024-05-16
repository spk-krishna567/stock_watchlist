import React, { useContext, useState } from "react";
import { GeneralContext } from "../api/GeneralContext";
import { Button, TextField } from "@mui/material";

interface LoginProps {
  setIsLoginBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoginBox }) => {
  const { login } = useContext(GeneralContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login();
  };

  return (
    <form className="authForm" onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-floating mb-3 authFormInputs">
        <TextField
          type="email"
          label="Email address"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <TextField
          type="password"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Sign in
      </Button>
      <p>
        Not registered?{" "}
        <span onClick={() => setIsLoginBox(false)}>Register</span>
      </p>
    </form>
  );
};

export default Login;

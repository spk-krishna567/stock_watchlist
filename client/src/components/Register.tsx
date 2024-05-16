import React, { useContext } from "react";
import { GeneralContext } from "../api/GeneralContext";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface RegisterProps {
  setIsLoginBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<RegisterProps> = ({ setIsLoginBox }) => {
  const { setUsername, setEmail, setPassword, setUsertype, register } =
    useContext(GeneralContext);
  const handleUsertypeChange = (
    e: SelectChangeEvent<
      string | number | readonly string[] | readonly number[]
    >
  ) => {
    // Here, we explicitly cast the value to string
    setUsertype(e.target.value as string);
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register();
  };

  return (
    <form className="authForm" onSubmit={handleRegister}>
      <h2>Register</h2>
      <div className="form-floating mb-3 authFormInputs">
        <TextField
          type="text"
          label="Username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <TextField
          type="email"
          label="Email address"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <TextField
          type="password"
          label="Password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <FormControl className="form-select form-select-lg mb-3">
        <InputLabel>User type</InputLabel>
        <Select onChange={handleUsertypeChange}>
          <MenuItem value="">User type</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Sign up
      </Button>
      <p>
        Already registered?{" "}
        <span onClick={() => setIsLoginBox(true)}>Login</span>
      </p>
    </form>
  );
};

export default Register;

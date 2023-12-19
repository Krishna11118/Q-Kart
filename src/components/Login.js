import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    if (!validateInput({ username, password })) {
      return;
    }
    try {
      setLoader(true);
      const response = await axios.post(`${config.endpoint}/auth/login`, {
        username: username,
        password: password,
      });

      if (response.status === 201) {
        enqueueSnackbar("Login Successful", { variant: "success" });
        persistLogin(
          response.data.token,
          response.data.username,
          response.data.balance
        );
        navigate("/");
      } else {
        setLoader(false);
        enqueueSnackbar("Login Failed", { variant: "error" });
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
        setLoader(false);
      } else {
        enqueueSnackbar(
          "Something went wrong. Check the backend and try again.",
          {
            variant: "error",
          }
        );
        setLoader(false);
      }
    }
  };

  const validateInput = (data) => {
    const { username, password } = data;

    if (!username.trim()) {
      enqueueSnackbar("Username is a required field", {
        variant: "warning",
      });
      return false;
    }

    if (!password.trim()) {
      enqueueSnackbar("Password is a required field", {
        variant: "warning",
      });
      return false;
    }
    return true;
  };

  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={username}
            onChange={handleUsername}
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            placeholder="Enter password"
            fullWidth
            value={password}
            onChange={handlePassword}
          />

          {loader ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="success" />
            </Box>
          ) : (
            <Button
              className="button"
              variant="contained"
              disabled={loader}
              onClick={login}
            >
              LOGIN TO QKart
            </Button>
          )}

          <p className="secondary-action">
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;

import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSnackbar } from "notistack";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../App";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  var postData = {
    username: formData.username,
    password: formData.password,
  };

  const register = () => {
    if (validateInput(formData)) {
      setLoader(true);
      axios
        .post(`${config.endpoint}/auth/register`, postData)
        .then((res) => {
          enqueueSnackbar("Registered Successfully", {
            variant: "success",
          });
          setLoader(false);
          navigate("/login");
          enqueueSnackbar("Login Please", {
            variant: "success",
          });
        })
        .catch((err) => {
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
        });
    }
  };

  const validateInput = (data) => {
    if (!data.username || data.username.trim() === "") {
      enqueueSnackbar("Username is a required field", {
        variant: "warning",
      });
      return false;
    }

    if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }

    if (!data.password || data.password.trim() === "") {
      enqueueSnackbar("Password is a required field", {
        variant: "warning",
      });
      return false;
    }

    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }

    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "warning",
      });
      return false;
    }

    return true;
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
        <Stack spacing={2} sx={{ p: 2 }} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be at least 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={handleChange}
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
            <Button className="button" variant="contained" onClick={register}>
              Register Now
            </Button>
          )}
          <p className="secondary-action">
            Already have an account?
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;

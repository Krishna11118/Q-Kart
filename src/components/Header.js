import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  //get username
  var username = localStorage.getItem("username");

  // navigate
  let navigate = useNavigate();

  //handle btn
  const handleLogout = () => {
    navigate("/");
    // history.go();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box className="header">
      <Box className="header-title">
        <img
          src="logo_light.svg"
          alt="QKart-icon"
          onClick={() => navigate("/")}
        ></img>
      </Box>

      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => navigate("/")}
        >
          Back to explore
        </Button>
      ) : !username ? (
        <>
          <Box width="30vw">{children && children}</Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              className="header-title"
              variant="text"
              style={{ color: "#47c09f" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>

            <Button
              className="header-title"
              variant="contained"
              style={{ backgroundColor: "#47c09f" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Box width="30w"> {children && children} </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar alt={username} src="./" />

            <p>{username}</p>

            <Button
              className="header-title"
              variant="text"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Header;

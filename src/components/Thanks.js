import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./Thanks.css";

const Thanks = () => {
  const history = useNavigate();

  const routeToProducts = () => {
    history("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/");
    }
  }, [history]);

  return (
    <>
      <Header />
      <Box className="greeting-container">
        <h2>Complete your Payment 😃</h2>
        <p>You will receive an invoice for your order shortly.</p>
        <p>Your order will arrive in 7 business days.</p>
        {/* <p id="balance-overline">Wallet Balance</p> */}
        {/* <p id="balance">${localStorage.getItem("balance")} Available</p> */}
        <Button
          variant="contained"
          size="large"
          id="continue-btn"
          onClick={routeToProducts}
        >
          Continue Shopping
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default Thanks;

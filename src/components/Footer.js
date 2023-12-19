import { Box } from "@mui/system";
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box className="footer">
      <Box>
        <img src="logo_dark.svg" alt="QKart-icon"></img>
      </Box>
      <Box className="footer-social">
        <Link to="/contact-us" className="footer-link">
          Contact Us
        </Link>
        <Link to="/shipping-and-delivery" className="footer-link">
          Shipping and Delivery
        </Link>
        <Link to="/cancellation-and-refund" className="footer-link">
          Cancellation and Refund
        </Link>
        <Link to="/terms-and-condition" className="footer-link">
          Terms and Conditions
        </Link>
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
        <Link to="/about-us" className="footer-link">
          About Us
        </Link>
      </Box>
      <p className="footer-text">
        QKart is your one stop solution to the buy the latest trending items
        with India's Fastest Delivery to your doorstep
      </p>
    </Box>
  );
};

export default Footer;

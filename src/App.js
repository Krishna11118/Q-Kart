import React from "react";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products";
import ipConfig from "./ipConfig.json";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import CancellationAndRefund from "./components/CancellationAndRefund";
import ShippingAndDelivery from "./components/ShippingAndDelivery";
import ContactUs from "./components/ContactUs";
import Aboutus from "./components/About";


export const config = {
  endpoint: `https://q-kart-frontend-srvd.onrender.com/api/v1`,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-condition" element={<TermsAndConditions />} />
          <Route path="/cancellation-and-refund" element={<CancellationAndRefund />}/>
          <Route path="/shipping-and-delivery" element={<ShippingAndDelivery />}/>
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<Aboutus />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

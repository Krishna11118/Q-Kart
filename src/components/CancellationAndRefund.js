import React from "react";
import "./ContactUs.css";
import Header from "./Header";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <>
      <Header />
      <div className="ContactForm">
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <div className="contactForm">
                <div className="contactUs">
                  <h2 classNmae="topic">Contact Us</h2>
                  <div>
                    <h2>Cancellation and Refund Policy</h2>

                    <h3>Cancellation</h3>
                    <p>
                      You can cancel your order within 24 hours of placing it.
                    </p>

                    <h3>Refund Process</h3>
                    <p>
                      Refunds are processed within 2-3 business days after the
                      cancellation is confirmed.
                    </p>

                    <p>
                      For more information, please visit our Cancellation and
                      Refund page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

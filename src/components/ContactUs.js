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
                  <h3>Customer Support</h3>
                  <p>Our customer support team is available 24/7.</p>
                  <p>
                    Reach out to us via email at{" "}
                    <a href="mailto: krishnassss365@.com">
                      {" "}
                      krishnassss365@gmail.com
                    </a>{" "}
                    or through our Contact Form.
                  </p>

                  <h3>Office Hours</h3>
                  <p>
                    Our customer support is available Monday to Friday, 9:00 AM
                    to 5:00 PM (IST).
                  </p>

                  <p>
                    Visit our Contact Us page for more ways to get in touch.
                    Your any query will be answered within 24 hours. Thank you
                    for your patience. We will try to solve your problem as soon
                    as possible.
                  </p>
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

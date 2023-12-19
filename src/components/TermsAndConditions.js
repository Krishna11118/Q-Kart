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
                    <h2>Terms and Conditions</h2>

                    <p>
                      By using our website or app, you agree to comply with and
                      be bound by the following Terms and Conditions. Please
                      review the terms carefully before using our services.
                    </p>

                    <h3>Payment and Billing</h3>
                    <p>
                      All payments are processed securely, and we do not store
                      your payment information.
                    </p>

                    <h3>Intellectual Property</h3>
                    <p>
                      All content on this website is the intellectual property.
                    </p>

                    <p>
                      Read our full Terms and Conditions for a comprehensive
                      understanding of your rights and responsibilities.
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

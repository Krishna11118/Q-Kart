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
                    <h2>Shipping and Delivery</h2>

                    <h3>Shipping Methods</h3>
                    <p>We offer standard and expedited shipping options.</p>

                    <h3>Delivery Timeframes</h3>
                    <p>
                      Estimated delivery times vary based on your location and
                      the chosen shipping method.
                    </p>

                    <p>
                      Learn more about our Shipping and Delivery process on the
                      dedicated page.
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

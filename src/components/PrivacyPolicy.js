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
                    <h2>Privacy Policy</h2>

                    <p>
                      Welcome to QKart This Privacy Policy
                      describes how we collect, use, and handle your personal
                      information when you use our services. Please take a
                      moment to read this policy to understand how we treat your
                      data.
                    </p>

                    <h3>Information We Collect</h3>
                    <p>
                      We collect personal information, such as your name,
                      contact details, and address when you create an account or
                      make a purchase. Additionally, we use cookies and similar
                      technologies to enhance your browsing experience.
                    </p>

                    <h3>How We Use Your Information</h3>
                    <p>
                      Your information is used to process orders, improve our
                      services, and communicate with you about promotions or
                      updates.
                    </p>

                    <h3>Security Measures</h3>
                    <p>
                      We employ industry-standard security measures to protect
                      your personal information from unauthorized access.
                    </p>

                    <p>
                      For more details, please read our complete Privacy Policy.
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

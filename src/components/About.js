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

                  <h2>About Us</h2>
                  <p>
                    Welcome to <span>Your E-commerce Website Name</span>, where
                    your shopping experience is our top priority. Established,
                    we have been dedicated to providing our customers with
                    high-quality products and exceptional service.
                  </p>

                  <h3>Our Story</h3>
                  <p>
                    <span>Your E-commerce Website Name</span> was founded with a
                    passion . Our journey began when envisioned creating a
                    platform that not only offers a wide range of premium
                    products but also fosters a community of like-minded
                    individuals who appreciate.
                  </p>

                  <h3>What Sets Us Apart</h3>
                  <ul>
                    <li>
                      <strong>Quality Assurance:</strong> We handpick every
                      product in our collection to ensure the highest quality
                      standards. Your satisfaction is our guarantee.
                    </li>
                    <li>
                      <strong>Customer-Centric Approach:</strong> Our customers
                      are at the heart of everything we do. We are committed to
                      providing excellent customer service and a seamless
                      shopping experience.
                    </li>
                    <li>
                      <strong>Innovation:</strong> We stay on the cutting edge
                      of trends to bring you the latest and most innovative
                      products.
                    </li>
                  </ul>
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

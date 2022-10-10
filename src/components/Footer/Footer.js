import React from "react";
import "./Footer.scss";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="logo">
              <img src="/logo.png" alt="" />
              <span>Veni</span>
            </div>
            <div className="info">
              <p>Address: HCMC, Vietnam</p>
              <p>Phone: +84 772.028.960</p>
              <p>
                Email:{" "}
                <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>
                  nguyenhoangkhoa2882@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <h5 className="footer-title">Useful Links</h5>
            <div className="footer__widget">
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">About Our Shop</a>
                </li>
                <li>
                  <a href="#">Secure Shopping</a>
                </li>
                <li>
                  <a href="#">Delivery infomation</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Our Sitemap</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="#">Who We Are</a>
                </li>
                <li>
                  <a href="#">Our Services</a>
                </li>
                <li>
                  <a href="#">Projects</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Innovation</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="footer-contact">
              <h5 className="footer-title">Join Our Newsletter Now</h5>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
              <div className="email-input mb-2">
                <input type="text" placeholder="Enter your email" />
                <button>subscribe</button>
              </div>
              <div className="social-contact">
                <a
                  target="_blank"
                  href={process.env.REACT_APP_CONTACT_FACEBOOK}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a target="_blank" href={process.env.REACT_APP_CONTACT_GITHUB}>
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

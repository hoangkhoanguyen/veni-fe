import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import Validate from "../../services/Validate";
import "./Contact.scss";

export const Contact = () => {
  const [messageInfo, setMessageInfo] = useState({});

  const handleChangeInfo = (e, key) => {
    setMessageInfo({
      ...messageInfo,
      [key]: e.target.value,
    });
  };

  const handleClickSendBtn = async () => {
    if (!messageInfo.name) {
      toast.error("Please enter your name!");
      return;
    }
    if (!messageInfo.email) {
      toast.error("Please enter your email!");
      return;
    }
    if (!Validate.ValidateEmail(messageInfo.email)) {
      toast.error("Please enter valid email!");
      return;
    }
    if (!messageInfo.mess) {
      toast.error("Please enter your message!");
      return;
    }

    //send request
    try {
      let result = await userService.sendFeedbackFromCustomer({
        email: messageInfo.email,
        name: messageInfo.name,
        content: messageInfo.mess,
      });

      if (result?.errCode === 0) {
        toast.success(result.errMsg);
      }
      if (result?.errCode !== 0) {
        toast.error(result.errMsg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong!");
    }
  };
  return (
    <div id="contact-page">
      <div className="container">
        <div className="info-items">
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-3">
              <a href="tel:+84772028960" className="info-item">
                <i className="fas fa-phone-alt"></i>
                <h4>Phone</h4>
                <p>+84-7-7202-8960</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <a href="#" className="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <h4>Address</h4>
                <p>Ho Chi Minh City, Vietnam</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <a href="#" className="info-item">
                <i class="fas fa-clock"></i>
                <h4>Open time</h4>
                <p>8:00 am to 22:00 pm</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <a
                href="mailto:nguyenhoangkhoa2882@gmail.com"
                className="info-item"
              >
                <i class="fas fa-envelope"></i>
                <h4>Email</h4>
                <p>nguyenhoangkhoa2882@gmail.com</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.3392431908!2d106.41433844465453!3d10.755340478404317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1665068848261!5m2!1svi!2s"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="email">
        <div className="container">
          <h3>Leave message</h3>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                value={messageInfo.name}
                type="text"
                placeholder="Your name"
                onChange={(e) => {
                  handleChangeInfo(e, "name");
                }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                value={messageInfo.email}
                type="text"
                placeholder="Your email"
                onChange={(e) => {
                  handleChangeInfo(e, "email");
                }}
              />
            </div>
            <div className="col-12 mb-3">
              <textarea
                value={messageInfo.mess}
                name=""
                id=""
                height="60"
                placeholder="Your message"
                onChange={(e) => {
                  handleChangeInfo(e, "mess");
                }}
              ></textarea>
            </div>
          </div>
          <div className="row justify-content-center mb-5">
            <button onClick={handleClickSendBtn}>Leave Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

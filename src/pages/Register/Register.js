import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path } from "../../constant";
import userService from "../../services/userService";
import Validate from "../../services/Validate";
import { toast } from "react-toastify";
import "./Register.scss";

export const Register = () => {
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (isLogin) {
      navigate(path.HOMEPAGE);
    }
  }, [isLogin]);

  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    rePassword: "",
  });

  const handleChangeInput = (e, key) => {
    setUserInfo({
      ...userInfo,
      [key]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (!Validate.ValidateMustNotEmpty(userInfo.username)) {
      toast.error("Username must not be empty!");
      return;
    }
    if (!Validate.ValidateMustNotEmpty(userInfo.firstName)) {
      toast.error("First Name must not be empty!");
      return;
    }
    if (!Validate.ValidateNormalLetter(userInfo.firstName)) {
      toast.error("First Name must contain normal letters!");
      return;
    }
    if (!Validate.ValidateMustNotEmpty(userInfo.lastName)) {
      toast.error("Last Name must not be empty!");
      return;
    }
    if (!Validate.ValidateNormalLetter(userInfo.lastName)) {
      toast.error("Last Name must contain normal letters!");
      return;
    }
    if (!Validate.ValidateMustNotEmpty(userInfo.password)) {
      toast.error("Password must not be empty!");
      return;
    }
    if (!Validate.ValidateMustNotEmpty(userInfo.rePassword)) {
      toast.error("Please confirm password!");
      return;
    }
    if (userInfo.rePassword != userInfo.password) {
      toast.error("Re-password does not match!");
      return;
    }
    try {
      let result = await userService.registerNewAccount({
        username: userInfo.username,
        password: userInfo.password,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        rePassword: userInfo.rePassword,
      });
      if (result && result.errCode === 0) {
        toast.success(result.errMsg);
        navigate(path.LOGIN);
      }
      if (result && result.errCode !== 0) {
        toast.error(result.errMsg);
      }
      if (!result) {
        toast.error("Something wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong!");
    }
  };
  return (
    <>
      <a className="back-home" href={path.HOMEPAGE}>
        <i className="fas fa-arrow-left"></i>
        Back to homepage
      </a>
      <div className="register-container">
        <div className="back-img"></div>
        <input
          type="text"
          placeholder="Username"
          value={userInfo.username}
          onChange={(e) => {
            handleChangeInput(e, "username");
          }}
        />
        <input
          type="text"
          placeholder="First name"
          value={userInfo.firstName}
          onChange={(e) => {
            handleChangeInput(e, "firstName");
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={userInfo.lastName}
          onChange={(e) => {
            handleChangeInput(e, "lastName");
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) => {
            handleChangeInput(e, "password");
          }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={userInfo.rePassword}
          onChange={(e) => {
            handleChangeInput(e, "rePassword");
          }}
        />
        <div>
          <button className="button-outline" onClick={handleRegister}>
            Register
          </button>
        </div>
        <p>
          You an account?{" "}
          <a className="register" href={path.LOGIN}>
            Login now
          </a>
        </p>
      </div>
    </>
  );
};

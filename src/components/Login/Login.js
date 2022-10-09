import React, { useEffect, useState } from "react";
// import { GoogleLogin, GoogleLogout } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { toast } from "react-toastify";
import { gapi } from "gapi-script";
import "./Login.scss";
import cookieService from "../../services/cookieService";
import productService from "../../services/productService";
import userService from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path } from "../../constant";
import { setLogin, updateUserInfo } from "../../redux/reducers/userReducer";
import Validate from "../../services/Validate";

const componentClicked = (data) => {
  console.log(data);
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.user.isLogin);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_APP_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    if (isLogin) {
      navigate(path.HOMEPAGE);
    }
  }, []);

  const handleLinkGoogleSuccess = async (googleData) => {
    console.log(googleData);
    return;
    if (googleData && googleData.tokenId) {
      try {
        let result = await userService.loginWithGoogle({
          tokenId: googleData.tokenId,
        });
        console.log(result);
        if (result && result.errCode === 0) {
          let data = result.data;
          dispatch(
            updateUserInfo({
              userId: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              image: data.image,
              phoneNumber: data.phoneNumber,
              address: data.address,
              location: data.location,
              isLinkedGoogle: data.isLinkedGoogle,
              isLinkedFacebook: data.isLinkedFacebook,
            })
          );
          dispatch(setLogin(true));
          toast.success("Login with google account successfully!");
          navigate(-1);
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
    }
  };

  const handleLinkFail = (googleData) => {
    console.log(googleData);
  };

  const handleLogout = (data) => {
    console.log(data);
  };

  const handlePressEnter = (e) => {
    if (e.code == "Enter") {
      handleClickLogin();
    }
  };

  const responseFacebook = async (response) => {
    console.log("response", response);
    return;
    try {
      let result = await userService.loginWithFacebook({
        accessToken: response.accessToken,
      });
      console.log(result);
      if (result && result.errCode === 0) {
        let data = result.data;
        dispatch(
          updateUserInfo({
            userId: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            image: data.image,
            phoneNumber: data.phoneNumber,
            address: data.address,
            location: data.location,
            isLinkedGoogle: data.isLinkedGoogle,
            isLinkedFacebook: data.isLinkedFacebook,
          })
        );
        dispatch(setLogin(true));
        toast.success("Login with facebook account successfully!");
        navigate(-1);
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

  const handleClickLogin = async () => {
    let isValidUsername = Validate.ValidateNormalLetter(username);
    if (!isValidUsername) {
      toast.error("Username must contain normal letters!");
      return;
    }
    let isValidPassword = Validate.ValidateMustNotEmpty(password);
    if (!isValidPassword) {
      toast.error("Password must not be empty!");
      return;
    }
    try {
      let result = await userService.login({ username, password });
      console.log(result);
      if (result && result.errCode === 0) {
        let data = result.data;
        dispatch(
          updateUserInfo({
            userId: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            image: data.image,
            phoneNumber: data.phoneNumber,
            address: data.address,
            location: data.location,
            isLinkedGoogle: data.isLinkedGoogle,
            isLinkedFacebook: data.isLinkedFacebook,
          })
        );
        dispatch(setLogin(true));
        toast.success("Log in successfully!");
        navigate(-1);
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

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      {/* <div className='back-img'>
            </div> */}
      <div className="login-body">
        <div className="info-content">
          <div>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onKeyDown={handlePressEnter}
              onChange={handleChangeUsername}
            />
            <span></span>
          </div>
          <div className="mb-4">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChangePassword}
              onKeyDown={handlePressEnter}
            />
            <span></span>
          </div>
          <div className="row">
            <div className="col-12 mb-3">
              <button className="button-outline" onClick={handleClickLogin}>
                Log in
              </button>
            </div>
            <div className="col-12 mb-3">
              <div className="google-login">
                {/* <GoogleLogin
                  // clientId={process.env.REACT_APP_GOOGLE_APP_ID}
                  clientId={
                    "1029413178204-rjrv66kpu777serp5v56khtied5ih7m5.apps.googleusercontent.com"
                  }
                  buttonText="Login with Google"
                  onSuccess={handleLinkGoogleSuccess}
                  onFailure={handleLinkFail}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin> */}
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse.credential);
                    // let decoded = jwt_decode(credentialResponse.credential);
                    // console.log(decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="facebook-login">
                <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={componentClicked}
                  callback={responseFacebook}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        You have no account?{" "}
        <a className="register" href={path.REGISTER}>
          Register now
        </a>
      </p>
    </div>
  );
};

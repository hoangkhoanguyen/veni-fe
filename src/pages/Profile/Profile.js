import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { path } from "../../constant";
import { updateUserInfo } from "../../redux/reducers/userReducer";
import cookieService from "../../services/cookieService";
import userService from "../../services/userService";
import Validate from "../../services/Validate";
import "./Profile.scss";

const componentClicked = (data) => {
  console.log("data", data);
};

const responseFacebooktest = (data) => {
  console.log("fb", data);
};

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [inputValue, setInputValue] = useState({});
  useEffect(() => {
    if (!isLogin) {
      navigate(path.LOGIN);
    }
  }, [isLogin]);

  useEffect(() => {
    if (userInfo) {
      setInputValue({
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
      });
    }
  }, [userInfo]);

  const responseFacebook = async (response) => {
    console.log("login facebook result", response);

    try {
      let result = await userService.linkToFacebook({
        accessToken: response.accessToken,
      });
      console.log(result);
      if (result && result.errCode === 0) {
        dispatch(
          updateUserInfo({
            userId: result.data.id,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            // isLinkedGoogle: true,
            isLinkedFacebook: true,
          })
        );
        toast.success("Link to facebook account successfully!");
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

  const handleLinkGoogleSuccess = async (data) => {
    if (!data) return;
    try {
      // cookieService.set('googleTokenId', data.tokenId)
      console.log(data);
      let result = await userService.linkToGoogle({ tokenId: data.credential });
      console.log(result);
      if (result && result.errCode === 0) {
        dispatch(
          updateUserInfo({
            userId: result.data.id,
            image: result.data.image,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            isLinkedGoogle: true,
            isLinkedFacebook: result.data.isLinkedFacebook,
          })
        );
        toast.success("Link to google account successfully!");
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

  const handleLinkGoogleFail = (data) => {
    console.log(data);
  };

  const handleChangeInput = (e, key) => {
    if (key == "phoneNumber" && !Validate.ValidateOnlyNumbers(e.target.value))
      return;
    setInputValue({
      ...inputValue,
      [key]: e.target.value,
    });
  };

  const handleClickUpdatebtn = async () => {
    try {
      let data = {
        phoneNumber: inputValue.phoneNumber,
        address: inputValue.address,
      };
      let result = await userService.updateInfo(data);
      if (result && result.errCode === 0) {
        dispatch(
          updateUserInfo({
            ...userInfo,
            phoneNumber: inputValue.phoneNumber,
            address: inputValue.address,
          })
        );
        toast.success(result.errMsg);
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
      {userInfo && (
        <div id="profile-container">
          <h2>{userInfo.name}</h2>
          {userInfo.image && <img src={userInfo.image} alt="" />}
          <p>
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              value={inputValue.phoneNumber}
              onChange={(e) => handleChangeInput(e, "phoneNumber")}
            />
          </p>
          <p>
            <label htmlFor="">Address</label>
            <input
              type="text"
              placeholder="Address"
              value={inputValue.address}
              onChange={(e) => handleChangeInput(e, "address")}
            />
          </p>
          {!userInfo.isLinkedGoogle && !userInfo.isLinkedFacebook && (
            <div className="link-google">
              <GoogleLogin
                onSuccess={handleLinkGoogleSuccess}
                onError={handleLinkGoogleFail}
                text="link to google account"
              ></GoogleLogin>
            </div>
          )}
          {/* {!userInfo.isLinkedGoogle && !userInfo.isLinkedFacebook && (
            <div className="link-facebook">
              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
              />
            </div>
          )} */}

          <button onClick={handleClickUpdatebtn}>Update</button>
        </div>
      )}
    </>
  );
};

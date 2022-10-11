import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CheckOut.scss";
import { CheckBox } from "../../components/CheckBox/CheckBox";
import { TitlePage } from "../../TitlePage/TitlePage";
import { useSelector } from "react-redux";
import { dispatch } from "../../redux/store";
import orderService from "../../services/orderService";
import { path } from "../../constant";
import { toast } from "react-toastify";
import Validate from "../../services/Validate";
import { useNavigate } from "react-router-dom";

export const CheckOut = () => {
  const navigate = useNavigate();
  const [isNewMember, setIsNewMember] = useState(true);
  // const [cloneUserInfo, setCloneUserInfo] = useState({})
  const [orderUserInfo, setOrderUserInfo] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const orderInfo = useSelector((state) => state.product.orderInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate(path.LOGIN);
    }
  }, [isLogin]);
  useEffect(() => {
    setOrderUserInfo({
      firstName: (userInfo && userInfo.firstName) || "",
      lastName: (userInfo && userInfo.lastName) || "",
      address: (userInfo && userInfo.address) || "",
      phoneNumber: (userInfo && userInfo.phoneNumber) || "",
      email: (userInfo && userInfo.email) || "",
      note: "",
    });
  }, [userInfo, isLogin]);

  const handleCheckCreateAcc = (value) => {
    setIsNewMember(value);
  };

  const changeOderUserInfo = (e, key) => {
    if (key === "phoneNumber" && !Validate.ValidateOnlyNumbers(e.target.value))
      return;
    setOrderUserInfo({
      ...orderUserInfo,
      [key]: e.target.value,
    });
  };

  const handleClickOrder = async () => {
    console.log(orderInfo.productList);
    if (!isLogin && isNewMember && !newPassword.trim()) {
      toast.error(
        "Please enter your password to create an account before ordering!"
      );
      return;
    }
    if (!isLogin && !isNewMember) {
      toast.error("Please log in first!");
      return;
    }
    if (!orderUserInfo.firstName.trim()) {
      toast.error("Please enter your first name!");
      return;
    }
    if (!orderUserInfo.lastName.trim()) {
      toast.error("Please enter your last name!");
      return;
    }
    if (!orderUserInfo.address.trim()) {
      toast.error("Please enter your address!");
      return;
    }
    if (!orderUserInfo.phoneNumber.trim()) {
      toast.error("Please enter your phone number!");
      return;
    }
    if (
      orderUserInfo.email !== "" &&
      !Validate.ValidateEmail(orderUserInfo.email)
    ) {
      toast.error("Email you typed is invalid!");
      return;
    }

    let data = {
      productList: JSON.stringify(orderInfo.productList),
      totalPrice: orderInfo.totalPrice,
      userId: userInfo.userId,
      firstName: orderUserInfo.firstName,
      lastName: orderUserInfo.lastName,
      address: orderUserInfo.address,
      phoneNumber: orderUserInfo.phoneNumber,
      email: orderUserInfo.email,
      note: orderUserInfo.note,
    };
    try {
      let result = await orderService.createNewOrder(data);
      if (result && result.errCode === 0) {
        setIsFinished(true);
      }
      if (result && result.errCode !== 0) {
        toast.error(result.errMsg);
      }
      if (!result) {
        toast.error("Something wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="checkout-page">
      <TitlePage
        titleName="Checkout"
        backgroundImg="https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/breadcrumb.jpg?raw=true"
      />
      {!isFinished ? (
        <div className="container mt-4">
          <h4>
            <b>Billing Details</b>
          </h4>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-8 mb-4">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="group">
                    <label htmlFor="">
                      Fist Name<span className="compul">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        changeOderUserInfo(e, "firstName");
                      }}
                      type="text"
                      value={(orderUserInfo && orderUserInfo.firstName) || ""}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="group">
                    <label htmlFor="">
                      Last Name<span className="compul">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        changeOderUserInfo(e, "lastName");
                      }}
                      type="text"
                      value={(orderUserInfo && orderUserInfo.lastName) || ""}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="group">
                    <label htmlFor="">
                      Address<span className="compul">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        changeOderUserInfo(e, "address");
                      }}
                      type="text"
                      value={(orderUserInfo && orderUserInfo.address) || ""}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="group">
                    <label htmlFor="">
                      Phone<span className="compul">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        changeOderUserInfo(e, "phoneNumber");
                      }}
                      type="text"
                      value={(orderUserInfo && orderUserInfo.phoneNumber) || ""}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="group">
                    <label htmlFor="">Email</label>
                    <input
                      onChange={(e) => {
                        changeOderUserInfo(e, "email");
                      }}
                      type="text"
                      value={(orderUserInfo && orderUserInfo.email) || ""}
                    />
                  </div>
                </div>
                {!isLogin && (
                  <div className="col-12">
                    <p>
                      If you are new here, you can enter your password before
                      pressing "Place Order" button to create a new account.
                    </p>
                  </div>
                )}
                {!isLogin && (
                  <div className="col-12">
                    <div className="group flex-row">
                      <CheckBox
                        id="create-account"
                        onCheck={() => {
                          handleCheckCreateAcc(false);
                        }}
                        onUnCheck={() => {
                          handleCheckCreateAcc(true);
                        }}
                      />
                      <label
                        style={{ cursor: "pointer" }}
                        htmlFor="create-account"
                      >
                        Do you have an account?
                      </label>
                    </div>
                  </div>
                )}
                {!isLogin && isNewMember && (
                  <motion.div layout className="col-12">
                    <div className="group">
                      <label htmlFor="">
                        Account Password<span className="compul">*</span>
                      </label>
                      <input type="password" value={newPassword} />
                    </div>
                  </motion.div>
                )}
                {!isLogin && !isNewMember && (
                  <div className="col-12 col-md-4 col-lg-6">
                    <a href={path.LOGIN}>Login before place an order</a>
                  </div>
                )}
                <div className="col-12">
                  <div className="group ">
                    <label htmlFor="">Order notes</label>
                    <input
                      type="text"
                      placeholder="Note about your order, e.g special notes for delivery."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="bg-light summary p-4">
                <h4>
                  <b>Your Order</b>
                </h4>
                <div className="product-list part-title">
                  <p className="mb-1">
                    <b>
                      Products <span>Total</span>
                    </b>
                  </p>
                  {orderInfo && orderInfo.productList && (
                    <ul>
                      {orderInfo.productList.length > 0 &&
                        orderInfo.productList.map((item) => {
                          return (
                            <li key={item.id}>
                              {item.name}
                              <span>${item.price * item.quantity}.00</span>
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </div>
                <div className="part-title">
                  <p className="mb-1">
                    <b>
                      Subtotal <span>$0.00</span>
                    </b>
                  </p>
                </div>
                <div className="part-title">
                  <p className="mb-1">
                    <b>
                      Total{" "}
                      <span className="compul">
                        ${(orderInfo && orderInfo.totalPrice) || 0}.00
                      </span>
                    </b>
                  </p>
                </div>
                <button onClick={handleClickOrder}>Place order</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row">
            <div className="finish-order">
              <img
                src="https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/thank-18624_640.jpg?raw=true"
                alt=""
              />
              <h3>Your order is complete!</h3>
              <p>You will be receiving your order information in your email.</p>
              <a href={path.HOMEPAGE}>Continue shoping</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

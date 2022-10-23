import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { path } from "../../constant";
import { clearUserInfo, setLogin } from "../../redux/reducers/userReducer";
import cookieService from "../../services/cookieService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.scss";

export const Header = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLogin = useSelector((state) => state.user.isLogin);
  const isChangeCart = useSelector((state) => state.app.isChangeCart);
  const isChangeHeart = useSelector((state) => state.app.isChangeHeart);
  const urlNeedLogin = [path.MY_STORE, path.PROFILE, path.CHECK_OUT];

  const [isShowLeftMenu, setIsShowLeftMenu] = useState(false);
  const [isShowRightMenu, setIsShowRightMenu] = useState(false);
  const [isShowDepartmentMenu, setIsShowDepartmentMenu] = useState(false);
  const [isShowNavbarMenu, setIsShowNavbarMenu] = useState(false);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [itemsInHeart, setItemsInHeart] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isShowUserOptionsMobile, setIsShowUserOptionsMobile] = useState(false);

  useEffect(() => {
    let itemsList = cookieService.get(
      isLogin ? "itemInCart" + userInfo.userId : "itemInCart"
    );
    if (itemsList) {
      setItemsInCart(itemsList.length);
    } else {
      setItemsInCart(0);
    }
  }, [userInfo, isChangeCart]);

  useEffect(() => {
    let itemsList = cookieService.get(
      isLogin ? "favouriteItems" + userInfo.userId : "favouriteItems"
    );
    if (itemsList) {
      setItemsInHeart(itemsList.length);
    } else {
      setItemsInHeart(0);
    }
  }, [userInfo, isChangeHeart]);

  useEffect(() => {
    const handleScollEvent = () => {};

    document.addEventListener("scroll", handleScollEvent);

    return () => {
      document.removeEventListener("scroll", handleScollEvent);
    };
  }, []);

  const handleLogout = () => {
    dispatch(clearUserInfo());
    cookieService.remove("accessToken");
    cookieService.remove("refreshToken");
    dispatch(setLogin(false));
    if (urlNeedLogin.includes(window.location.pathname)) {
      window.location.href = path.LOGIN;
    }
  };

  const handleToggleLeftMenu = (e) => {
    if (document.body.clientWidth <= 886) {
      setIsShowLeftMenu(!isShowLeftMenu);
    }
  };

  const handleToggleRightMenu = (e) => {
    if (document.body.clientWidth <= 886) {
      setIsShowRightMenu(!isShowRightMenu);
    }
  };

  const toggleDepartmentMenu = () => {
    setIsShowDepartmentMenu(!isShowDepartmentMenu);
  };

  const toggleNavbarMenu = () => {
    setIsShowNavbarMenu(!isShowNavbarMenu);
  };

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleClickSearchBtn = () => {
    if (searchText.trim() == "") return;

    //send request
  };

  return (
    <AnimatePresence>
      <motion.header
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.3 }}
        exit={{ height: 0, transition: { duration: 0.2 } }}
      >
        <div className="container-fluid d-none d-lg-block header_top">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="header_top_left">
                  <ul>
                    <li>
                      <i className="fa fa-envelope"></i>{" "}
                      nguyenhoangkhoa2882@gmail.com
                    </li>
                    <li> Free Shipping for all Order of $99</li>
                  </ul>
                </div>
              </div>
              <div className="col-6">
                <div className="header_top_right">
                  <ul>
                    <li className="contact-social">
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    {/* <li className="language">
                      <img src="/icon/VN_flag.png" alt="" />
                      <span>Tiếng Việt</span>
                    </li> */}
                    {!isLogin && (
                      <li className="log-in-out">
                        <a href={path.LOGIN}>
                          <i className="fa fa-user"></i> Login
                        </a>
                      </li>
                    )}
                    {isLogin && userInfo && (
                      <li className="user-name">
                        {userInfo.firstName + " " + userInfo.lastName}
                        <div className="user-option">
                          {/* <span>
                            <a
                              href={process.env.REACT_APP_URL_MANAGE_WEBSITE}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fas fa-tools"></i> Settings
                            </a>
                          </span> */}
                          <span>
                            <a href={path.PROFILE}>
                              <i className="fas fa-user"></i> My account
                            </a>
                          </span>

                          <span>
                            <a href={path.MY_STORE}>
                              <i className="fas fa-store"></i> My shop
                            </a>
                          </span>

                          <span>
                            <a href={path.HISTORY}>
                              <i className="fas fa-history"></i> My orders
                            </a>
                          </span>

                          <span onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Log out
                          </span>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container header_nav">
          <div className="row">
            <div className="col-6 col-lg-3">
              <a href="/">
                <div className="logo">
                  <img src="/logo.png" alt="" />
                  <span>Veni</span>
                </div>
              </a>
            </div>
            <div className="col-6">
              <div className="nav_bar d-none d-lg-block">
                <ul>
                  <li>
                    <a href={path.HOMEPAGE}>Home</a>
                  </li>
                  {/* <li><a href={path.PRODUCTS_GRID}>Shop</a></li> */}
                  <li>
                    <a href={path.BLOGS}>Blog</a>
                  </li>
                  <li>
                    <a href={path.CONTACT}>Contact</a>
                  </li>

                  {/* <li>
                    <a href={path.MY_STORE}>Manage My shop</a>
                  </li> */}
                </ul>
              </div>
              <div className="d-lg-none toggle_navbar_btn">
                <i className="fas fa-bars" onClick={toggleNavbarMenu}></i>
              </div>
              {isShowNavbarMenu && (
                <div
                  className="vertical-navbar-bg"
                  onClick={toggleNavbarMenu}
                ></div>
              )}
              <div
                className={
                  isShowNavbarMenu
                    ? "vertical-navbar show d-lg-none"
                    : "vertical-navbar d-lg-none"
                }
              >
                <div className="logo">
                  <a href={path.HOMEPAGE}>
                    <div className="logo">
                      <img src="/logo.png" alt="" />
                      <span>Veni</span>
                    </div>
                  </a>
                </div>
                <div className="close-btn" onClick={toggleNavbarMenu}>
                  <i className="fas fa-times"></i>
                </div>
                {!isLogin && (
                  <div className="log-in-out">
                    <a href={path.LOGIN}>
                      <i className="fa fa-user"></i> Login
                    </a>
                  </div>
                )}
                {isLogin && userInfo && (
                  <div className="user-mobile">
                    {/* <span className="language">
                    <img src="/icon/VN_flag.png" alt="" />
                    <span>Tiếng Việt</span>
                  </span> */}
                    {/* <span className="log-in-out">
                    <a href="#">
                      <i className="fa fa-user"></i> Login
                    </a>
                  </span> */}
                    {/* {userInfo.firstName + " " + userInfo.lastName} */}
                    <span
                      onClick={() => {
                        setIsShowUserOptionsMobile(!isShowUserOptionsMobile);
                      }}
                    >
                      {userInfo.firstName + " " + userInfo.lastName}
                    </span>
                    {isShowUserOptionsMobile && (
                      <div className="user-option">
                        {/* <span>
                          <a
                            href={process.env.REACT_APP_URL_MANAGE_WEBSITE}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i classname="fas fa-wrench"></i> Settings
                          </a>
                        </span> */}
                        {/* 
                        <span>
                          <a href={path.MY_STORE}>
                            <i className="fas fa-store"></i> My shop
                          </a>
                        </span>

                        <span>
                          <a href={path.HISTORY}>
                            <i className="fas fa-history"></i> My orders
                          </a>
                        </span> */}
                        <span>
                          <a href={path.PROFILE}>
                            <i className="fas fa-user"></i> My account
                          </a>
                        </span>

                        <span>
                          <a href={path.MY_STORE}>
                            <i className="fas fa-store"></i> My shop
                          </a>
                        </span>

                        <span>
                          <a href={path.HISTORY}>
                            <i className="fas fa-history"></i> My orders
                          </a>
                        </span>

                        <span onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt"></i> Log out
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <ul>
                  <li>
                    <a href={path.HOMEPAGE}>Home</a>
                  </li>
                  {/* <li><a href={path.PRODUCTS_GRID}>Shop</a></li> */}
                  <li>
                    <a href={path.BLOGS}>Blog</a>
                  </li>
                  <li>
                    <a href={path.CONTACT}>Contact</a>
                  </li>
                  {/* <li>
                    <a href={path.MY_STORE}>Manage My shop</a>
                  </li> */}
                </ul>
                <div className="contact-social">
                  <a
                    target="_blank"
                    href={process.env.REACT_APP_CONTACT_FACEBOOK}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    target="_blank"
                    href={process.env.REACT_APP_CONTACT_GITHUB}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>
                  <i className="fa fa-envelope"></i>{" "}
                  nguyenhoangkhoa2882@gmail.com
                </a>
                <div> Free Shipping for all Order of $99</div>
              </div>
            </div>
            <div className="col-12 col-lg-2 d-none d-lg-block">
              <div className="nav_right">
                <ul>
                  <li>
                    <a href="">
                      <i className="fas fa-heart">
                        <span>{itemsInHeart}</span>
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href={path.CART}>
                      <i className="fas fa-shopping-bag">
                        <span>{itemsInCart}</span>
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-9 col-lg-3 mb-2 mb-md-3">
              <div className="deparment_container">
                <div
                  className="toggle_deparments_btn"
                  onClick={toggleDepartmentMenu}
                >
                  <i className="fas fa-bars"></i>
                  <span>All departments</span>
                  <i className="fas fa-angle-down"></i>
                </div>
                <AnimatePresence>
                  {isShowDepartmentMenu && (
                    <motion.ul
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0, transition: { duration: 0.3 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <li>Fresh Meat</li>
                      <li>Vegetables</li>
                      <li>Fruit & Nut Gifts</li>
                      <li>Fresh Berries</li>
                      <li>Ocean Foods</li>
                      <li>Butter & Eggs</li>
                      <li>Fastfood</li>
                      <li>Fresh Onion</li>
                      <li>Papayaya & Crisps</li>
                      <li>Oatmeal</li>
                      <li>Fresh Bananas</li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div
              className="col-3 d-lg-none "
              style={{ paddingRight: "2.5rem" }}
            >
              <div className="noti">
                <ul>
                  <li>
                    <a href="">
                      <i className="fas fa-heart">
                        <span>{itemsInHeart}</span>
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href={path.CART}>
                      <i className="fas fa-shopping-bag">
                        <span>{itemsInCart}</span>
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-6 mb-2 mb-md-3">
              <div className="search-area">
                <input
                  type="text"
                  placeholder="What do you need?"
                  value={searchText}
                  onChange={handleChangeSearchText}
                />
                <button onClick={handleClickSearchBtn}>Search</button>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-3 d-none d-md-block">
              <div className="contact-help justify-content-start">
                <i className="fas fa-phone-alt"></i>
                <div className="details ">
                  <span className="phone-number">+84 772028960</span>
                  <span className="desc">Support 24/7 time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

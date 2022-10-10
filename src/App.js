import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Login } from "./components/Login/Login";
import { path } from "./constant";
import { Cart } from "./pages/Cart/Cart";
import { HomePage } from "./pages/HomePage/HomePage";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";
import { History } from "./pages/History/History";
import { MyStore } from "./pages/MyStore/MyStore";
import { Order } from "./pages/Order/Order";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Loading } from "./components/Loading/Loading";
import { useSelector } from "react-redux";
import { OrderDetails } from "./pages/OrderDetails/OrderDetails";
import { CheckOut } from "./pages/CheckOut/CheckOut";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { ProductsGrid } from "./pages/ProductsGrid/ProductsGrid";
import { Contact } from "./pages/Contact/Contact";
import { Blog } from "./pages/Blog/Blog";
import { NormalPage } from "./pages/NormalPage/NormalPage";

function App() {
  const isLoading = useSelector((state) => state.app.isLoading);

  return (
    <>
      <Router>
        <Routes>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path="/" element={<NormalPage />}>
            <Route index element={<HomePage />} />
            <Route path={path.CART} element={<Cart />} />
            <Route path={path.PROFILE} element={<Profile />} />
            <Route path={path.HISTORY} element={<History />} />
            <Route path={path.MY_STORE} element={<MyStore />} />
            <Route path={path.ORDER} element={<Order />} />
            <Route path={path.ORDER_DETAILS} element={<OrderDetails />} />
            <Route path={path.CHECK_OUT} element={<CheckOut />} />
            <Route path={path.PRODUCT_DETAILS} element={<ProductDetails />} />
            <Route path={path.CONTACT} element={<Contact />} />
            <Route path={path.BLOGS} element={<Blog />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLoading && <Loading />}
    </>
  );
}

export default App;

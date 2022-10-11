import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import orderService from "../../services/orderService";
import { toast } from "react-toastify";
import { ProductInOrderHistory } from "../../components/ProductInOrderHistory/ProductInOrderHistory";
import "./OrderDetails.scss";
import { path } from "../../constant";
import Validate from "../../services/Validate";

export const OrderDetails = () => {
  const { id } = useParams();

  const userInfo = useSelector((state) => state.user.userInfo);
  const [orderInfo, setOrderInfo] = useState();
  const [productInfoList, setProductInfoList] = useState([]);
  const [isReOrder, setIsReOrder] = useState(false);
  const [quantity, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [unitPrice, setUnitPrice] = useState([]);

  const getPurchaseHistory = async (index) => {
    try {
      let result = await orderService.getOrderHistory(index);
      console.log(result);
      if (result && result.errCode === 0) {
        setOrderInfo(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPurchaseHistory(id);
  }, []);

  useEffect(() => {
    if (productInfoList && productInfoList.length >= 0) {
      setQuantity(productInfoList.map((item) => 1));
      setUnitPrice(productInfoList.map((item) => 1));
    }
  }, [productInfoList]);

  useEffect(() => {
    setTimeout(() => {
      let total = 0;
      let arrAmount = document.querySelectorAll(
        ".order-details-page table .amount"
      );
      console.log(quantity);
      arrAmount &&
        arrAmount.forEach((item, index) => {
          let value = item.innerText.split(" ");
          total += parseInt(value[0]);
        });
      setTotalPrice(total);
    }, 200);
  }, [quantity, isReOrder]);

  const getProductIdAndQuantity = (data) => {
    let result = [];
    result[0] = {
      id: data[0],
      quan: 1,
    };
    let i = 0;
    data = data.slice(1);
    data.forEach((item, index) => {
      if (result[i].id == item) {
        result[i].quan += 1;
      } else {
        i += 1;
        result[i] = {
          id: item,
          quan: 1,
        };
      }
    });
    return result;
  };

  useEffect(() => {
    if (orderInfo && orderInfo.productIdList) {
      console.log("parse");
      let arr = JSON.parse(orderInfo.productIdList);
      let result = getProductIdAndQuantity(arr);
      setProductInfoList(result);
      console.log(result);
    }
  }, [orderInfo]);

  const handleDecreaseQuantity = (index) => {
    console.log(quantity[index]);
    if (quantity[index] > 0) {
      setQuantity(quantity.map((item, id) => (id == index ? item - 1 : item)));
    }
  };

  const handleChangeQuantity = (e, index, available) => {
    let isNumber = Validate.ValidateOnlyNumbers(e.target.value);
    if (!isNumber) return;
    if (e.target.value <= available && e.target.value >= 0) {
      setQuantity(
        quantity.map((item, id) => (id == index ? e.target.value : item))
      );
    }
  };

  const handleIncreaseQuantity = (index, available) => {
    if (quantity[index] < available) {
      setQuantity(quantity.map((item, id) => (id == index ? item + 1 : item)));
    }
  };

  const handleClickOrderBtn = async () => {
    let arr = [];
    productInfoList.forEach((item, index) => {
      for (let i = 0; i < quantity[index]; i++) {
        arr.push(item.id);
      }
    });
    let idList = JSON.stringify(arr);
    try {
      let data = {
        userId: userInfo.userId,
        productIdList: idList,
        totalPrice,
      };
      console.log(data);
      let result = await orderService.createNewOrder(data);
      if (result && result.errCode === 0) {
        toast.success(result.errMsg);
        setQuantity(quantity.map((item) => 1));
        setIsReOrder(false);
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

  const handleClickReOrderBtn = () => {
    setIsReOrder(true);
  };

  const handleClickCancelBtn = () => {
    setIsReOrder(false);
    setQuantity(quantity.map((item) => 1));
  };
  return (
    <div className="order-details-page">
      {console.log(orderInfo)}
      <h3>My order details</h3>
      <div className="product-list-container">
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Image</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Seller</th>
            </tr>
          </thead>
          <tbody>
            {/* {productInfoList && productInfoList.length>0 && productInfoList.map((item, index)=>{
                      return <ProductInOrderHistory
                      handleDecreaseQuantity={handleDecreaseQuantity}
                      handleChangeQuantity={handleChangeQuantity}
                      handleIncreaseQuantity={handleIncreaseQuantity}
                      quantity={quantity[index]}
                      isReOrder={isReOrder} data={item} key={index} index={index}/>
                  })} */}
            {console.log(orderInfo)}
            {orderInfo && console.log(JSON.parse(orderInfo.productList))}
            {/* {orderInfo && orderInfo} */}
          </tbody>
        </table>
        {orderInfo && (
          <p className="summary-area">
            Total: {isReOrder ? totalPrice : orderInfo.totalPrice} $
          </p>
        )}
        <div className="button-area">
          {!isReOrder && (
            <button onClick={handleClickReOrderBtn}>Re-order</button>
          )}
          {isReOrder && totalPrice > 0 && (
            <button onClick={handleClickOrderBtn}>Order</button>
          )}
          {isReOrder && totalPrice == 0 && (
            <button className="disable">Order</button>
          )}
          {isReOrder && <button onClick={handleClickCancelBtn}>Cancel</button>}
        </div>
      </div>
    </div>
  );
};

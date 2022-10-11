import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import productService from "../../services/productService";

export const ProductInOrderHistory = (props) => {
  const {
    data,
    index,
    isReOrder,
    quantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleChangeQuantity,
  } = props;
  const dispatch = useDispatch();

  const [productInfo, setProductInfo] = useState();
  const [amount, setAmount] = useState();

  const getProductInfo = async (id) => {
    try {
      let result = await productService.getProductFromId(id);
      console.log(result);
      if (result && result.errCode === 0) {
        setProductInfo(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data && data.id) {
      getProductInfo(data.id);
    }
  }, []);

  useEffect(() => {
    if (productInfo && productInfo.price) {
      setAmount(quantity * productInfo.price);
    }
  }, [quantity, productInfo]);
  return (
    <>
      {productInfo && (
        <tr>
          <td>{index + 1}</td>
          <td>
            <img src={productInfo.image} alt="" />
          </td>
          <td>{productInfo.name}</td>
          <td className="unit-price">{productInfo.price} $</td>
          {!isReOrder ? (
            <td>{quantity}</td>
          ) : (
            <td className="quantity">
              <button
                className="decrease"
                onClick={() => {
                  handleDecreaseQuantity(index);
                }}
              >
                -
              </button>
              <input
                type="text"
                className="number"
                onChange={(e) => {
                  handleChangeQuantity(
                    e,
                    index,
                    productInfo.total - productInfo.booked
                  );
                }}
                value={quantity}
              />
              <button
                className="increase"
                onClick={() => {
                  handleIncreaseQuantity(
                    index,
                    productInfo.total - productInfo.booked
                  );
                }}
              >
                +
              </button>
            </td>
          )}
          {!isReOrder ? (
            <td>{data.quan * productInfo.price} $</td>
          ) : (
            <td className="amount">{amount} $</td>
          )}
          {productInfo.sellerData && (
            <td>
              {productInfo.sellerData.firstName +
                " " +
                productInfo.sellerData.lastName}
            </td>
          )}
        </tr>
      )}
    </>
  );
};

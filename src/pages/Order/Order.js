import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openHideModal } from '../../redux/reducers/appReducer'
import cookieService from '../../services/cookieService'
import { path } from '../../constant'
import { useNavigate } from 'react-router-dom'
import orderService from '../../services/orderService'
import Validate from '../../services/Validate'
import './Order.scss'
import { toast } from 'react-toastify'
import { TitlePage } from '../../TitlePage/TitlePage'
import { updateOrderInfo } from '../../redux/reducers/productReducer'

const demo = [
  1,2,3
]

export const Order = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderList = useSelector(state=>state.product.orderList)
    const userInfo = useSelector(state=>state.user.userInfo)
    const isLogin = useSelector(state=>state.user.isLogin)
  const [quantity, setQuantity] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    setQuantity(orderList.map(item => {
      return item.available>0? 1 : 0
    }))
  }, [orderList])

  useEffect(() => {
    if (!isLogin) {
      // navigate(path.LOGIN)
    }
  }, [isLogin])


  useEffect(() => {
    let total = orderList.reduce((sum, item, index) => {
      return item.price * quantity[index] + sum
    }, 0)
    setTotalPrice(total)
  }, [quantity])


  const handleDecreaseQuantity = (index) => {
    if (quantity[index] > 0) {
      setQuantity(quantity.map((item, id) => id == index ? item - 1 : item))
    }
  }

  const handleIncreaseQuantity = (index, available) => {
    if (quantity[index] < available) {
      setQuantity(quantity.map((item, id) => id == index ? item + 1 : item))
    }
  }

  const handleChangeQuantity = (e, index, available) => {
    let isNumber = Validate.ValidateOnlyNumbers(e.target.value)
    if (!isNumber) return

    if (e.target.value <= available && e.target.value >= 0) {
      setQuantity(quantity.map((item, id) => id == index ? e.target.value : item))
    }
  }

  const handleClickNext = () => {
    dispatch(updateOrderInfo({
      productList: orderList.filter((item, index)=> quantity[index] > 0).map((item, index)=> {
        return {
          ...item,
          quantity: quantity[index]
        }
      }),
      subTotal: subTotal,
      totalPrice: totalPrice
    }))
    navigate(path.CHECK_OUT)
  }

  // const handleClickOrderBtn = async () => {
  //   let arr = []
  //   orderList.forEach((item, index) => {
  //     for (let i = 0; i < quantity[index]; i++) {
  //       arr.push(item.id)
  //     }
  //   })
  //   let productIdList = JSON.stringify(arr)
  //   try {
  //     let data = {
  //       userId: userInfo.userId,
  //       productIdList,
  //       totalPrice
  //     }
  //     let result = await orderService.createNewOrder(data)
  //     if (result && result.errCode == 0) {
  //       toast.success(result.errMsg)
  //     }
  //     if (result && result.errCode !== 0) {
  //       toast.error(result.errMsg)
  //     }
  //     if (!result) {
  //       toast.error('Something wrong!')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     toast.error('Something wrong!')
  //   }
  // }


  return (
    <div className='order-container' >
      {console.log(orderList)}
        <TitlePage titleName='Order' breakcrum='Home-Order' />
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList && orderList.length > 0 && orderList.map((item, index) => {
                    return <tr className='list-item' key={index} >
                      <td>
                        <img src={item.image} alt="" />
                        <span>{item.name}</span>
                      </td>
                      <td className="price">${item.price}.00</td>
                      <td>
                        <div className="quantity">
                          <button className="decrease" onClick={() => { handleDecreaseQuantity(index) }}>-</button>
                          <input type="text" className="number" onChange={(e) => { handleChangeQuantity(e, index, item.total - item.booked) }} value={quantity[index]} />
                          <button className="increase" onClick={() => { handleIncreaseQuantity(index, item.total - item.booked) }}>+</button>
                        </div>
                      </td>
                      <td>${item.price * quantity[index]}.00</td>
                    </tr>
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <h5 className='font-weight-bold'><b>Discount Codes</b></h5>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <input className='w-100 p-2 text-center' type="text" placeholder='Enter your coupon code'/>
              </div>
              <div className="col-12 col-md-5 mb-3">
                <button className='w-100 p-2 pl-4 pr-4 bg-secondary text-white text-uppercase'><b>apply coupon</b></button>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="summary-area bg-light p-4">
              <h5 className='mb-4'><b>Cart Total</b></h5>
              <ul>
                <li className='d-flex justify-content-between'>
                  <span><b>Subtotal</b></span>
                  <span><b className='text-danger'>$0</b></span>
                </li>
                <li className='d-flex justify-content-between'>
                  <span><b>Total</b></span>
                  <span><b className='text-danger'>${totalPrice}.00</b></span>
                </li>
              </ul>
              {quantity && quantity.length > 0 && quantity.reduce((sum, quan)=>sum + quan, 0) > 0?
                <button className='submit-btn' onClick={handleClickNext}>PROCEED TO CHECKOUT</button>
                :
                <button disabled >PROCEED TO CHECKOUT</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

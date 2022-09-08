import React, { useEffect, useState } from 'react'
import cookieService from '../../services/cookieService'
import productService from '../../services/productService'
import { CheckBox } from '../CheckBox/CheckBox'
import './ProductLineInCart.scss'

export const ProductLineInCart = (props) => {
    const {data, index, removeItemFromCart, selectItem, unselectItem, isChecked} = props
    const [productInfo, setProductInfo] = useState()

    
  return (
      <>
        {/* {productInfo &&  */}
        <tr>
            <td className="check-box">
                {/* <input type="checkbox" onChange={handleChangeCheckBox}/> */}
                <CheckBox id={`product-${data.id}`} 
                    onCheck={()=>{selectItem(index)}}
                    onUnCheck={()=>{unselectItem(index)}}
                    isChecked={isChecked}
                />
            </td>
            <td >
                <img src={data.image} alt="" />
                <span>{data.name}</span>
            </td>
            <td className="product-price">${data.price}.00</td>
            <td className="delete-btn" 
            onClick={()=>{removeItemFromCart(data.id)}}
            >
                <i class="fas fa-times"></i>
            </td>
        </tr>
        {/* } */}
    </>
  )
}

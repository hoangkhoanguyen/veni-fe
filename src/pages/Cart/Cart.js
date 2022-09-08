import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ProductLineInCart } from '../../components/ProductLineInCart/ProductLineInCart'
import { setOrderList } from '../../redux/reducers/productReducer'
import cookieService from '../../services/cookieService'
import { toast } from 'react-toastify';
import productService from '../../services/productService'
import {path} from '../../constant'
import './Cart.scss'
import { TitlePage } from '../../TitlePage/TitlePage'
import { CheckBox } from '../../components/CheckBox/CheckBox'
import { setChangeCart } from '../../redux/reducers/appReducer'

const demoProductIdListData = [
    1,2,3
]

export const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLogin = useSelector(state=>state.user.isLogin)
    const userInfo = useSelector(state=>state.user.userInfo)
    const isChangeCart = useSelector(state=>state.app.isChangeCart)

    const [productIdList, setProductIdList] = useState()
    const [productList, setProductList] = useState()
    const [itemInCart, setItemInCart] = useState('itemInCart')
    const [checkedList, setCheckedList] = useState([])

    useEffect(()=> {
        // dispatch(setOrderList([]))
    },[])
    const getProductListByIdList = async (data) => {
        try {
            let result = await productService.getProductListByIdList(data)
            if (result && result.errCode === 0) {
                setProductList(result.data)
            }
            if (result && result.errCode !== 0) {
                toast.error(result.errMsg)
            }
            if (!result) {
                toast.error('Something wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

    },[])

    useEffect(()=>{
        let dataFromCookies
        if (userInfo && userInfo.userId) {
            dataFromCookies = cookieService.get(itemInCart + userInfo.userId)
            setItemInCart(itemInCart + userInfo.userId)
        } else {
            dataFromCookies = cookieService.get('itemInCart')
        }
        setProductIdList(dataFromCookies)
    },[isLogin, userInfo])

    useEffect(()=>{
        if (productIdList && productIdList.length > 0) {
            let data = JSON.stringify(productIdList)
            getProductListByIdList(data)
        } else {
            setProductList([])
        }
    },[productIdList])

    useEffect(()=>{
        if(productList) {
            setCheckedList(productList.map(item=>false))
        }
    },[productList])

    const selectItem = (index) => {
        setCheckedList(checkedList.map((item, id)=> id === index ? true : item))
    }

    const unselectItem = (index) => {
        setCheckedList(checkedList.map((item, id)=> id === index ? false : item))
    }

    const handleCheckAll = () => {
        if(productIdList && productIdList.length > 0) {
            setCheckedList(productIdList.map(item=>true))
        }
    }

    const handleUnCheckAll = () => {
        if(productIdList && productIdList.length > 0) {
            setCheckedList(productIdList.map(item=>false))
        }
    }

    const handleRemoveItemFromCart = (id) => {
        cookieService.set(itemInCart, productIdList.filter(item=>item!=id))
        dispatch(setChangeCart(!isChangeCart))
        setProductIdList(productIdList.filter(item=>item!=id))
    }

    const handleClickNext = () => {
        dispatch(setOrderList(productList.filter((item, index)=>checkedList[index])))
        navigate(path.ORDER)
    }
  return (
    <div className='cart-container'>
        <TitlePage titleName='Shopping Cart' breakcrum='Home-Shopping Cart' backgroundImg='https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/breadcrumb.jpg?raw=true' />
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <CheckBox 
                                            id='check-all' 
                                            onCheck={handleCheckAll}
                                            onUnCheck={handleUnCheckAll}/>
                                    </th>
                                    <th>Product</th>
                                    <th>Unit Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList && productList.length > 0 && productList.map((item,index)=>{
                                    return <ProductLineInCart 
                                    key={index} data={item} index={index}
                                    removeItemFromCart={handleRemoveItemFromCart}
                                    selectItem={selectItem}
                                    unselectItem={unselectItem}
                                    isChecked ={checkedList[index]}
                                    />
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                    {checkedList && checkedList.length>0 && checkedList.reduce((result, item)=>result || item, false) ?
                    <button className='button-outline' onClick={handleClickNext}>Go To Order Page</button> 
                    :
                    <button disabled >Go To Order Page</button>}
                </div>
            </div>
            
        </div>
    </div>
  )
}

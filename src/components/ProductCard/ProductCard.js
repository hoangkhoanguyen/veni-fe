import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { setChangeCart, setChangeHeart } from '../../redux/reducers/appReducer'

import cookieService from '../../services/cookieService'
import './ProductCard.scss'
import { path } from '../../constant'


export const ProductCard = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector(state=>state.user.userInfo)
    const isChangeCart = useSelector(state=>state.app.isChangeCart)
    const isChangeHeart = useSelector(state=>state.app.isChangeHeart)

    const {data, isSale} = props

    // const handleClickBuy = () =>{
    //     dispatch(setOrderList([{...productInfo}]))
    //     navigate(path.ORDER)
    // }

    const handleClickAddToCart = () =>{
        let key = 'itemInCart'
        if (userInfo && userInfo.userId) {
            key = key + userInfo.userId
        }
        let current = cookieService.get(key) || []
        console.log(current)
        if (current.includes(data.id + '')){
            toast.info('Item already exists in your cart!')
        } else {
            current.push(data.id + '')
            cookieService.set(key, JSON.stringify(current))
            dispatch(setChangeCart(!isChangeCart))
            toast.success('Added item to your cart!')
        }
    }

    const handleClickFavourite = () => {
        let key = 'favouriteItems'
        if (userInfo && userInfo.userId) {
            key = key + userInfo.userId
        }
        let current = cookieService.get(key) || []
        if (current.includes(data.id)){
            toast.info('Item already exists in your favourite list!')
        } else {
            current.push(data.id)
            cookieService.set(key, JSON.stringify(current))
            dispatch(setChangeHeart(!isChangeHeart))
            toast.success('Added item to your favourite list!')
        }
    }

    return (
        <div className="product-card-body">
            <div className="img" style={{background:`url(${data.image})`}}>
                {isSale && 
                    <span className='discount'>
                        -{data.discount}%
                    </span>
                }
                <ul>
                    <li onClick={handleClickFavourite}><i className="fas fa-heart"></i></li>
                    <li onClick={handleClickAddToCart}><i className="fas fa-shopping-cart"></i></li>
                    <li><a href={`product-details-${data.id}`}><i className="fas fa-angle-double-right"></i></a></li>
                </ul>
            </div>
            <div className="content text-center">
                <p>{data.name}</p>
                <p>${data.price} {isSale && <span>${data.initPrice}</span>}</p>
            </div>

        </div>
    )
}

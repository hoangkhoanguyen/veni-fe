import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import productService from '../../services/productService'
import { TitlePage } from '../../TitlePage/TitlePage'
import './ProductDetails.scss'
import cookieService from '../../services/cookieService'
import { setChangeCart, setChangeHeart } from '../../redux/reducers/appReducer'

const demoRelatedProducts = [
  {
    id: 0,
    name: 'Crab Pool Security',
    image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-2.jpg?raw=true',
    price: 20
  },
  {
    id: 1,
    name: 'Crab Pool Security',
    image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-2.jpg?raw=true',
    price: 20
  },
  {
    id: 2,
    name: 'Crab Pool Security',
    image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-2.jpg?raw=true',
    price: 20
  },
  {
    id: 3,
    name: 'Crab Pool Security',
    image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-2.jpg?raw=true',
    price: 20
  },
]

export const ProductDetails = () => {

  const dispatch = useDispatch()
  const [typeDesc, setTypeDesc] = useState('desc')
  const [productInfo, setProductInfo] = useState()
  const {id} = useParams()
  const userInfo = useSelector(state=>state.user.userInfo)
  const isChangeCart = useSelector(state=>state.app.isChangeCart)
  const isChangeHeart = useSelector(state=>state.app.isChangeHeart)

  const getProductInfo = async (id) => {
    try {
      let result = await productService.getProductFromId(id)
      if(result && result.errCode === 0) {
        setProductInfo(result.data)
      } else {
        setProductInfo()
      }
      console.log(result)
    } catch (error) {
      console.log(error)
      setProductInfo()
    }
  }

  useEffect(()=>{
    if(id) {
      getProductInfo(id)
    }
  },[id])

  const handleClickAddCart = () => {
    let key = 'itemInCart'
    if (userInfo && userInfo.userId) {
        key = key + userInfo.userId
    }
    let current = cookieService.get(key) || []
    console.log(current.includes(id))
    if (current.includes(id)){
        toast.info('Item already exists in your cart')
    } else {
        current.push(id)
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
    if (current.includes(productInfo.id)){
        toast.info('Item already exists in your favourite list!')
    } else {
        current.push(productInfo.id)
        cookieService.set(key, JSON.stringify(current))
        dispatch(setChangeHeart(!isChangeHeart))
        toast.success('Added item to your favourite list!')
    }
}

  return (
    <div className='product-details'>
      <TitlePage titleName='Vegetable’s Package' backgroundImg='https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/breadcrumb.jpg?raw=true'/>
      <div className="container pt-5">
        {productInfo && <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <div className="product-details-pic">
              <img src={productInfo.image} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-details-text">
              {productInfo.name && <h3>{productInfo.name}</h3>}
              <div className="product-rating">
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <span>(18 reviews)</span>
              </div>
              {productInfo.price && <p className="product-price">${productInfo.price}.00</p>}
              {productInfo.summary && <p className="short-desc">{productInfo.summary}</p>}
              <div className="actions">
                <span onClick={handleClickAddCart}>add to cart</span>
                <span onClick={handleClickFavourite}><i className="far fa-heart"></i></span>
              </div>
              <ul>
                <li>
                  <span>Availability</span>
                  <span>{productInfo.total - productInfo.booked > 0 ? 'In Stock' : 'Out Of Stock'}</span>
                </li>
                <li>
                  <span>Weight</span>
                  <span>0.5 kg</span>
                </li>
                <li>
                  <span>Share on</span>
                  <span className="shares">
                    <div className="share"><i className="fab fa-facebook-f"></i></div>
                    <div className="share"><i className="fab fa-twitter"></i></div>
                    <div className="share"><i className="fab fa-instagram"></i></div>
                    <div className="share"><i className="fab fa-pinterest"></i></div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>}
       {productInfo && <div className="row">
          <div className="col-12 mb-2">
            <ul className="tab-options">
              <li className={typeDesc === 'desc' ? 'active' : ''} onClick={()=>{setTypeDesc('desc')}}>Description</li>
              <li className={typeDesc === 'info' ? 'active' : ''} onClick={()=>{setTypeDesc('info')}}>Information</li>
              <li className={typeDesc === 'review' ? 'active' : ''} onClick={()=>{setTypeDesc('review')}}>Reviews</li>
            </ul>
          </div>
          <div className="col-12 mb-5">
            <ul className="long-desc">
              <li className={typeDesc === 'desc' ? 'active' : ''} >
                <h5>Products Description</h5>
                { productInfo.detailsDescription && <p>{productInfo.detailsDescription}</p>}
              </li>
              <li className={typeDesc === 'info' ? 'active' : ''}>
                <h5>Products Infomation</h5>
                <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.</p>
              </li>
              <li className={typeDesc === 'review' ? 'active' : ''}>
                <h5>Reviews of Customer</h5>
                <p>This function is on developing stage</p>
              </li>
            </ul>
          </div>
        </div>}
        <div className="row mb-4">
          <div className="col-12">
            <div className="title-section">
              <h2>Related Product</h2>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          {demoRelatedProducts && demoRelatedProducts.length > 0 && demoRelatedProducts.map(item=>{
            return <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard data={item} />
            </div>
          })}
          
        </div>
      </div>
    </div>
  )
}

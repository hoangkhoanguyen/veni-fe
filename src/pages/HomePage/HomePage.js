import React, { useState } from 'react'
import { useEffect } from 'react'
import {motion} from 'framer-motion'
import mixitup from 'mixitup'
import { BlogRecommend } from '../../components/BlogRecommend/BlogRecommend'
import { ProductCard } from '../../components/ProductCard/ProductCard'

import { ProductsCarousel } from '../../components/ProductsCarousel/ProductsCarousel'
import { RankProductCarousel } from '../../components/RankProductCarousel/RankProductCarousel'
import { TypeProductCarousel } from '../../components/TypeProductCarousel/TypeProductCarousel'
import './HomePage.scss'
import productService from '../../services/productService'

const demoRankProductData ={
    rankType: 'Latest Products',
    productList: [
      {
        id: 0,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      },
      {
        id: 1,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      },
      {
        id: 2,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      },
      {
        id: 3,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      },
      {
        id: 4,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      },
      {
        id: 5,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      },
      {
        id: 6,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      },
      {
        id: 7,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      },
      {
        id: 8,
        name: 'Crab Pool Security',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/latest-product/lp-1.jpg?raw=true',
        price: 30.5
      }
    ]
  }

  const demoBlogRecommendData = [
    {
      id: 0,
      link: '',
      name: 'Cooking tips make cooking simple',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/blog/blog-1.jpg?raw=true',
      desc: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
    },
    {
      id: 1,
      link: '',
      name: 'Cooking tips make cooking simple',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/blog/blog-1.jpg?raw=true',
      desc: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
    },
    {
      id: 2,
      link: '',
      name: 'Cooking tips make cooking simple',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/blog/blog-1.jpg?raw=true',
      desc: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
    },
  ]

  const demoProductListData = [
    {
      id: 0,
      name: 'Crab Pool Security',
      type: 'meat vegetable',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-1.jpg?raw=true',
      price: 30.00
    },
    {
      id: 1,
      name: 'Crab Pool Security',
      type: 'fruit fastfood meat',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-2.jpg?raw=true',
      price: 30.00
    },
    {
      id: 2,
      name: 'Crab Pool Security',
      type: 'fruit',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-3.jpg?raw=true',
      price: 30.00
    },
    {
      id: 3,
      name: 'Crab Pool Security',
      type: 'fruit',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-4.jpg?raw=true',
      price: 30.00
    },
    {
      id: 4,
      name: 'Crab Pool Security',
      type: 'fruit',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-5.jpg?raw=true',
      price: 30.02
    },
    {
      id: 5,
      name: 'Crab Pool Security',
      type: 'fastfood',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-6.jpg?raw=true',
      price: 30.00
    },
    {
      id: 6,
      name: 'Crab Pool Security',
      type: 'fruit',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-7.jpg?raw=true',
      price: 30.00
    },
    {
      id: 7,
      name: 'Crab Pool Security',
      type: 'vegetable',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-8.jpg?raw=true',
      price: 30.00
    },
  ]

export const HomePage = () => {

  const [typeProduct, setTypeProduct] = useState('all')
  const [productList, setProductList] = useState()
  const [filterdList, setFilteredList] = useState()
  // const [productList, setProductList] = useState([])

  // useEffect(()=>{
  //   if (typeProduct == 'all') {
  //     setProductList(demoProductListData)
  //     return
  //   }

  //   setProductList(demoProductListData.filter(item=>item.type.indexOf(typeProduct)!=-1))
  // },[typeProduct])

  const getProductList = async () => {
    try {
      let result = await productService.getAllProducts()
      if (result && result.errCode === 0) {
        setProductList(result.data)
      } 
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   mixitup(".feartured-products", {
  //     selectors: {
  //       target: ".product",
  //     },
  //     animation: {
  //       duration: 500
  //     }
  //   });
  // }, []);

  useEffect(()=>{
    if(productList && productList.length >= 0) {
      setFilteredList(productList)
    }
  },[productList])

  useEffect(()=>{
    getProductList()
    // setProductList(demoProductListData)
  },[])

  const handleChangeTypeProduct = (value) => {
    setTypeProduct(value)
    if (value === 'all') {
      setFilteredList(productList)
    } else {
      setFilteredList(productList.filter(item=>item.type.includes(value)))
    }
  }

  return (
    <div className='home-page'>

      <div className="container">

        <div className="row mb-5">
          <div className="col-12 col-lg-3"></div>
          <div className="col-12 col-lg-9">
            <div className="main-content" >
              <img className='w-100' src="https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/hero/banner.jpg?raw=true" alt="" />
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <TypeProductCarousel />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 mb-3">
            <div className="title-section">
              <h2>Featured Product</h2>
            </div>
          </div>
          <div className="col-12">
            <ul className="fearture_control">
              <li data-filter='.all' className={typeProduct == 'all'?'active':''} onClick={()=>{handleChangeTypeProduct('all')}}>All</li>
              <li data-filter='.fruit' className={typeProduct == 'fruit'?'active':''} onClick={()=>{handleChangeTypeProduct('fruit')}}>Fruit</li>
              <li data-filter='.meat' className={typeProduct == 'meat'?'active':''} onClick={()=>{handleChangeTypeProduct('meat')}}>Fresh Meat</li>
              <li data-filter='.vegetable' className={typeProduct == 'vegetable'?'active':''} onClick={()=>{handleChangeTypeProduct('vegetable')}}>Vegetables</li>
              <li data-filter='.fastfood' className={typeProduct == 'fastfood'?'active':''} onClick={()=>{handleChangeTypeProduct('fastfood')}}>Fastfood</li>
            </ul>
          </div>
        </div>

        <motion.div  className="row feartured-products">
          {/* {demoProductListData && demoProductListData.length > 0 && demoProductListData.map((item, index)=> { */}
          {filterdList && filterdList.length > 0 && filterdList.map((item, index)=> {
            return <motion.div layout 
            className={`col-12 col-md-4 col-lg-3 `}
            key={item.id}>
              <ProductCard data={item}/>
            </motion.div>
          })}
         
        </motion.div>

      
        <div className="row mb-5">
          <div className="col-12 col-md-6 col-lg-4">
            <RankProductCarousel data={demoRankProductData}/>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <RankProductCarousel data={demoRankProductData}/>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <RankProductCarousel data={demoRankProductData}/>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <div className="title-section">
              <h2>May useful for you</h2>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          {demoBlogRecommendData && demoBlogRecommendData.length > 0 && demoBlogRecommendData.map(item=>{
            return <div className="col-12 col-md-6 col-lg-4">
              <BlogRecommend data={item}/>
            </div>
          })}
        </div>
      </div>
    </div>

  )
}

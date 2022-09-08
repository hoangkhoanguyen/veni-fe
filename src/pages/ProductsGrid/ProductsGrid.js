import React, { useEffect } from 'react'
import './ProductsGrid.scss'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { CheckBox } from '../../components/CheckBox/CheckBox'
import { RankProductCarousel } from '../../components/RankProductCarousel/RankProductCarousel'
import { TitlePage } from '../../TitlePage/TitlePage'
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { toast } from 'react-toastify';
import productService from '../../services/productService';
import { useState } from 'react';

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

  const demoSaleProductListData = [
    {
      id: 0,
      name: 'Crab Pool Security',
      type: 'meat vegetable',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-1.jpg?raw=true',
      price: 30.00,
      discount: 20,
      initPrice: 36.00
    },
    {
      id: 1,
      name: 'Crab Pool Security',
      type: 'fruit fastfood meat',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-2.jpg?raw=true',
      price: 30.00,
      discount: 20,
      initPrice: 36.00
    },
    {
      id: 2,
      name: 'Crab Pool Security',
      type: 'fruit',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-3.jpg?raw=true',
      price: 30.00,
      discount: 20,
      initPrice: 36.00
    },
    {
      id: 3,
      name: 'Crab Pool Security',
      type: 'fruit',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-4.jpg?raw=true',
      price: 30.00,
      discount: 20,
      initPrice: 36.00
    },
    {
      id: 4,
      name: 'Crab Pool Security',
      type: 'fruit',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-5.jpg?raw=true',
      price: 30.02,
      discount: 20,
      initPrice: 36.00
    },
    {
      id: 5,
      name: 'Crab Pool Security',
      type: 'fastfood',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-6.jpg?raw=true',
      price: 30.00,
      discount: 20,
      initPrice: 36.00
    },
    {
      id: 6,
      name: 'Crab Pool Security',
      type: 'fruit',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-7.jpg?raw=true',
      price: 30.00,
      discount: 20,
      initPrice: 36.00
    },
    {
      id: 7,
      name: 'Crab Pool Security',
      type: 'vegetable',
      image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/featured/feature-8.jpg?raw=true',
      price: 30.00,
      discount: 20,
      initPrice: 36.00
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

export const ProductsGrid = () => {

  const [productList, setProductList] = useState()

  const getProducts = async () => {
    try {
      let result = await productService.getAllProducts()
      console.log(result)
      if (result && result.errCode === 0) {
        setProductList(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getProducts()
  },[])
    const options = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        autoplay: true,
        loop: true,
        nav: false,
        dots: true,
        // dotsEach: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            516: {
                items: 2,
            },
            700: {
                items: 3,
            }
        },
      };
  return (
    <div className='products-grid'>
        <TitlePage titleName='Organi Shop' backgroundImg='https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/breadcrumb.jpg?raw=true' />
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-5 col-xl-3">
                    <div className="sidebar">
                        <h4>Department</h4>
                        <ul className="department-list">
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
                        </ul>
                        <h4>Price</h4>
                        <h4>Popular Size</h4>
                        <ul>
                            <li>Large</li>
                            <li>Medium</li>
                            <li>Small</li>
                            <li>Tiny</li>
                        </ul>
                        <RankProductCarousel data={demoRankProductData} />
                    </div>
                </div>
                <div className="col-12 col-lg-7 col-xl-9">
                    <div className="title-section">
                        <h2>Sale Off</h2>
                    </div>
                    <div className="sale-products-list mb-4">
                    <OwlCarousel className="slider-items owl-carousel type-product-container" {...options}>
                        {demoSaleProductListData && demoSaleProductListData.length > 0 && demoSaleProductListData.map(item => {
                            return <ProductCard data={item} isSale={true}/>
                        })}
                    </OwlCarousel>
                    </div>
                    <div className="filter-container">
                        
                    </div>
                    <div className="row">
                      {productList && productList.length > 0 && productList.map(item=>{
                        return <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                          <ProductCard data={item} />
                        </div>
                      })}
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

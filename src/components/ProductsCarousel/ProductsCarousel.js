import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch } from 'react-redux'
import { ProductCard } from '../ProductCard/ProductCard'
import productService from '../../services/productService'
import './ProductsCarousel.scss'

export const ProductsCarousel = () => {

    const [productList, setProductList] = useState()

    async function getProducts() {
        try {
            let result = await productService.getAllProducts()
            console.log(result)
            if (result && result.errCode == 0) {
                setProductList(result.data)
            } else {
                setProductList([])
            }
        } catch (error) {
            console.log(error)
            setProductList([])
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const options = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        autoplay: false,
        navText: ["Prev", "Next"],
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            700: {
                items: 3,
            },
            960: {
                items: 4,
            }
        },
      };

    return (
        <>
            <OwlCarousel className="slider-items owl-carousel" {...options}>
                {productList && productList.length > 0 && productList.map(item => {
                    return <div className="product-item" key={item.id}>
                        
                    </div>
                })}
            </OwlCarousel>
        </>
    )
}

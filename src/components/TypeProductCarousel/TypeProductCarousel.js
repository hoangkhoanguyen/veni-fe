import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch } from 'react-redux'
import { ProductCard } from '../ProductCard/ProductCard'
import productService from '../../services/productService'
import './TypeProductCarousel.scss'

const demoTypeProductData = [
    {
        id: 0,
        name: 'Fresh Fruit',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/categories/cat-1.jpg?raw=true'
    },
    {
        id: 1,
        name: 'Dried Fruit',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/categories/cat-2.jpg?raw=true'
    },
    {
        id: 2,
        name: 'Vegetable',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/categories/cat-3.jpg?raw=true'
    },
    {
        id: 3,
        name: 'drink fruits',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/categories/cat-4.jpg?raw=true'
    },
    {
        id: 4,
        name: 'meat',
        image: 'https://github.com/hoangkhoanguyen/SharingFileFree/blob/main/organic_shop/img/categories/cat-5.jpg?raw=true'
    }
]

export const TypeProductCarousel = () => {

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
        // getProducts()
    }, [])

    const options = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        autoplay: true,
        loop: true,
        navText: ["<", ">"],
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
            <OwlCarousel className="slider-items owl-carousel type-product-container" {...options}>
                {demoTypeProductData && demoTypeProductData.length > 0 && demoTypeProductData.map(item => {
                    return <div className="item" key={item.id}>
                        <img src={item.image} alt="" />
                        <div className="name">
                            <span>{item.name}</span>
                        </div>
                    </div>
                })}
            </OwlCarousel>
        </>
    )
}

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ProductCard } from '../ProductCard/ProductCard'
import productService from '../../services/productService'
import './ProductsContainer.scss'

export const ProductsContainer = () => {

    const [productList, setProductList] = useState()

    async function getProducts() {
        try {
            let result = await productService.getAllProducts()
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

    return (
        <>
            <div className="product-container">
                {productList && productList.length > 0 && productList.map(item => {
                    return <div className="product-item" key={item.id}>
                        <ProductCard productInfo={item} />
                    </div>
                })}
                {productList && productList.length == 0 && 
                    <p>
                        There's no product here.
                    </p>}
            </div>
        </>
    )
}

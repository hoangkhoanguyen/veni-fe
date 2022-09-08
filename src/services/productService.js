import axios from '../axios'
import { setLoading } from '../redux/reducers/appReducer'
import { dispatch } from '../redux/store'

const addNewProduct = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/product/add-product-info', data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const getAllProducts = async () =>{
    try {
        // dispatch(setLoading(true))
        let result = await axios.get('/api/product/get')
        // dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        // dispatch(setLoading(false))
    }
}

const getProductListByIdList = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.get('/api/product/get-products-by-id-list' + '?idList=' + data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const getAllProductsFromMyStore = async () =>{
    try {
        dispatch(setLoading(true))
        let result = await axios.get('/api/product/get-product-from-my-store')
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const getProductFromId = async (id) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.get(`/api/product/get?id=${id}`)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const addQuantityToInventory = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/product/add-quantity-to-inventory',data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const updateProductInfo = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/product/update-product-info', data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const deleteProduct = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/product/delete-product', data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

export default {
    getAllProducts, getProductFromId,
    addNewProduct,addQuantityToInventory,
    getAllProductsFromMyStore,
    updateProductInfo, deleteProduct,
    getProductListByIdList,
}
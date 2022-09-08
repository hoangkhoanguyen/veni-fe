import axios from '../axios'
import { setLoading } from '../redux/reducers/appReducer'
import { dispatch } from '../redux/store'

const createNewOrder = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/order/create',data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const getOrderHistory = async (id) => {
    try {
        dispatch(setLoading(true))
        let url = id? `/api/order/get?id=${id}` : '/api/order/get'
        let result = await axios.get(url)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

export default {
    createNewOrder,getOrderHistory
}
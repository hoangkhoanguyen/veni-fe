import axios from '../axios'
import { setLoading } from '../redux/reducers/appReducer'
import { dispatch } from '../redux/store'

const linkToGoogle = async (data) => {
    try {
        let body = data
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/link-to-google-account', body)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const linkToFacebook = async (data) => {
    try {
        let body = data
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/link-to-facebook-account', body)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const login = async(data) => {
    try {
        let body = data
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/login',body)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const loginWithGoogle = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/log-in-with-google',data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const loginWithFacebook = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/log-in-with-facebook',data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const registerNewAccount = async (data) => {
    try {
        let body = data
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/addNew',body)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const checkAuth = async () =>{
    try {
        let body = {}
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/check-auth', body)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const updateInfo = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/update-info',data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

const sendFeedbackFromCustomer = async (data) => {
    try {
        dispatch(setLoading(true))
        let result = await axios.post('/api/user/send-message-to-admin',data)
        dispatch(setLoading(false))
        return result
    } catch (error) {
        console.log(error)
        dispatch(setLoading(false))
    }
}

export default {
    linkToGoogle, login,
    registerNewAccount,
    loginWithGoogle,
    checkAuth,updateInfo,
    linkToFacebook,
    loginWithFacebook,
    sendFeedbackFromCustomer,
}
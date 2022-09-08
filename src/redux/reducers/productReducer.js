

import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        orderList: [],
        orderInfo: {}
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        updateOrderInfo: (state, action) => {
            state.orderInfo=action.payload
        }   
    }
})

// Action creators are generated for each case reducer function
export const { setOrderList, updateOrderInfo } = productSlice.actions

export default productSlice.reducer
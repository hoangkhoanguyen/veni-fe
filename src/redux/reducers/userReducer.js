import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice(
    {
        name: 'user',
        initialState: {
            isLogin: false,
            userInfo: {}
        },
        reducers: {
            setLogin: (state, action) => {
                state.isLogin = action.payload
            },
            updateUserInfo: (state, action) => {
                state.userInfo = action.payload
            },
            clearUserInfo: (state, action) => {
                state.userInfo = {}
            },
        }
    }
)

export const { setLogin, updateUserInfo , clearUserInfo } = userSlice.actions

export default userSlice.reducer
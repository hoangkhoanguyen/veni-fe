import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice(
    {
        name: 'app',
        initialState: {
            isShowModal: false,
            isLoading: false,
            isChangeCart:false,
            isChangeHeart:false,
        },
        reducers: {
            openHideModal: (state, action) => {
                state.isShowModal = action.payload
            },
            setLoading: (state, action) => {
                state.isLoading = action.payload
            },
            setChangeCart: (state, action) => {
                state.isChangeCart = action.payload
            },
            setChangeHeart: (state, action) => {
                state.isChangeHeart = action.payload
            },
        }
    }
)

export const { openHideModal,setLoading, setChangeCart ,setChangeHeart } = appSlice.actions

export default appSlice.reducer
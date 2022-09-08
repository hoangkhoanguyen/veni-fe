// import { combineReducers, createStore } from "redux"
// import { productReducer } from "./reducers/productReducer"
// import { createSlice, configureStore } from '@reduxjs/toolkit'

// const store = createStore(productReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__())

// export default store

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appReducer from './reducers/appReducer'
import productReducer from './reducers/productReducer'
// import { BackgroundReducer } from './reducers/BackgroundReducer'
import userReducer from './reducers/userReducer'
// import productReducer from './reducers/productReducer'
// import SidebarReducer from './reducers/SidebarReducer'


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['app'],
}

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    product: productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

export default store

export const dispatch = store.dispatch;
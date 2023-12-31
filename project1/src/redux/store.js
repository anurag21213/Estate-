import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducers'
import userReducer from './user/useSlice'

import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReduccer=combineReducers({user:userReducer})

const persistConfig={
    key:'root',
    storage,
    version:1
}

const persistedReducer=persistReducer(persistConfig,rootReduccer)

const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})

})

export const persistor=persistStore(store)

export default store
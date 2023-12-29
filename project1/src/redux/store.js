import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducers'
import userReducer from './user/useSlice'
const store = configureStore({
  reducer: {user:userReducer},
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})

})

export default store
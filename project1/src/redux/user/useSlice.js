import { createSlice} from '@reduxjs/toolkit'

const initialState={
    currUser:null,
    loading:false,
    error:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.currUser=action.payload,
            state.loading=false;
            state.error=null

        },
        signInFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export const {signInStart,signInFailure,signInSuccess}=userSlice.actions

export default userSlice.reducer
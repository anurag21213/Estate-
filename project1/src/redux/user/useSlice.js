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
        },
        updateUserStart:(state)=>{
            state.loading=true
        },
        updateUserSuccess:(state,action)=>{
             state.loading=false
             state.currUser=action.payload
             state.error=null
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        deleteUserStart:(state)=>{
            state.loading=true
        },
        deleteUserSuccess:(state,action)=>{
            state.currUser=null,
            state.loading=false,
            state.error=null
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload,
            state.loading=false
        },
        logoutUserStart:(state)=>{
            state.loading=true
        },
        logoutUserSuccess:(state,action)=>{
            state.currUser=null,
            state.loading=false,
            state.error=null
        },
        logoutUserFailure:(state,action)=>{
            state.error=action.payload,
            state.loading=false
        }

    }
})

export const {signInStart,signInFailure,signInSuccess,updateUserFailure,updateUserSuccess,updateUserStart,deleteUserFailure,deleteUserSuccess,deleteUserStart,logoutUserFailure,logoutUserStart,logoutUserSuccess}=userSlice.actions

export default userSlice.reducer
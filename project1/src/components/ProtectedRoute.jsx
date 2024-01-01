import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const {currUser}=useSelector((state)=>state.user)
  return currUser?<Outlet/>:<Navigate to='/signup'/>
}

export default ProtectedRoute

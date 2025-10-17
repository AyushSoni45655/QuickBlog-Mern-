import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/Contexts'
import { useNavigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const {token} = useContext(AppContext);
  useEffect(()=>{
    if(!token){
       navigate("/signin",{replace:true})
    }
  },[token,navigate])
  if(!token){
    return null
  }
  return children
}

export default ProtectedRoute

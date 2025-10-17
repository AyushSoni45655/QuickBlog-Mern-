

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/Contexts';
const PublicRoute = ({children}) => {
  const navigate = useNavigate();
  const {token} = useContext(AppContext)
useEffect(()=>{
  if(token){
    navigate("/")
  }
},[token,navigate]);
if(token){
  return null;
}
 
  return children
}

export default PublicRoute

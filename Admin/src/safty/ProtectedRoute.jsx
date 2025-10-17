import { useContext } from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { AppContext } from "../Contexts/Context";
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

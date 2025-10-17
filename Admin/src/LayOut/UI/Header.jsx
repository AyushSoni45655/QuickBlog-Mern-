import React from 'react'
import {assets} from "../../assets/assets"
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { useContext } from 'react';
import { AppContext } from '../../Contexts/Context';
const Header = () => {
  const {logout,token} = useContext(AppContext);
  return (
    <div className='w-full h-fit border-b-[1px] border-b-gray-300 '>
      <div className='sections h-fit flex items-center justify-between py-2'>
        {/* logo here */}
        <div className='w-36 h-10 overflow-hidden'>
          <img src={assets.logo} alt="" className=' object-cover object-center' />
        </div>
        {/* login signin button here */}
        
          <div onClick={()=>logout()} className='flex gap-2 bg-blue-700 px-6 py-2 rounded-full flex-row items-center justify-center'>
          <h3 className='font-bold tracking-wider text-white'>{token ? "LogOut":"Login"}</h3>
          <FaArrowRight  className='text-white '/>
        </div>
       
      </div>
    </div>
  )
}

export default Header

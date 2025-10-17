import React from 'react'
import Header from './UI/Header'
import Footer from './UI/Footer'
import { Outlet } from 'react-router-dom'
import SideBar from '../pages/SideBar'
const AppLayOut = () => {
  return (
    <>
    {/* i am a header */}
    <Header/>
    <div className='w-full min-h-screen flex'>
      {/* sideBar here */}
      <div className='w-1/6 h-full border-r-[2px] border-r-gray-500'>
        <SideBar/>
      </div>
      {/* outlet here */}
      <div className='flex-1'>
        <Outlet/>
      </div>
    </div>
    {/* i am a footer page */}
    <Footer/>
    </>
  )
}

export default AppLayOut

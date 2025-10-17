import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/Contexts'
import { blogCategories } from '../assets/assets';
const LandingPage = () => {
const {tabItem,setTabItem,searchText,setSearchText} = useContext(AppContext);
 



  return (
    <div className='w-full h-fit flex flex-col items-center'>
      <h2 className='text-black mt-16 font-bold text-5xl text-center tracking-wider'>
        Your Own <span className='text-blue-700 font-bold'>Blogging</span> <br /> Platform
      </h2>

      <p className='text-gray-400 w-11/12 sm:w-2/3 lg:w-1/2 text-center mt-4 tracking-wider font-medium'>
        This is your space to think out loud, to share what matters, and to write without filters.
        Whether it's one word or a thousand, your story starts right here.
      </p>

      {/* Search Box */}
      <div className='flex h-12 w-full max-w-2xl rounded-full mt-8 border-2 border-gray-600 shadow-sm px-2'>
        <input
        value={searchText}
        onChange={(e)=>setSearchText(e.target.value)}
          type="text"
          placeholder='Search your blogs here...'
          className='h-full flex-1 outline-none border-none pl-3 text-gray-700'
        />
        <div className='w-1/5 h-full rounded-full bg-blue-700 hover:bg-blue-800 transition-all cursor-pointer flex items-center justify-center'>
          <h2 className='text-white font-semibold'>Search</h2>
        </div>
      </div>

      {/* Tab Bar */}
      <div className='flex flex-wrap justify-center w-full mt-12 gap-3 sm:gap-6'>
        {blogCategories.map((val, index) => (
          <div
            key={index}
            onClick={() => setTabItem(val)}
            className={`p-2 px-4 border rounded-md tracking-wider cursor-pointer transition-all duration-300
            ${tabItem === val
              ? "bg-blue-800 text-white border-blue-800 shadow-md"
              : "border-gray-300 text-gray-600 hover:bg-blue-100 hover:border-blue-500"}`}
          >
            {val.charAt(0).toUpperCase() + val.slice(1)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LandingPage

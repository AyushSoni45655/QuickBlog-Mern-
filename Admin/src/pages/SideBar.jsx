// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink } from 'react-router-dom'
// const SideBar = () => {
  
//   const sidedata = [
//     {
//       id:214,
//       pic:[assets.home_icon],
//       name:"DashBoard",
//       path:"/"
//     },
//      {
//       id:22,
//       pic:[assets.add_icon],
//       name:"Add Blogs",
//       path:"/addblogs"
//     },
//      {
//       id:343,
//       pic:[assets.list_icon],
//       name:"Blog List",
//       path:"/bloglist"
//     },
//      {
//       id:44,
//       pic:[assets.comment_icon],
//       name:"Comments",
//       path:"/comments"
//     }
//   ]
//   const [sidebarSelect,setSideBarSlect] = useState(sidedata[0])
//   return (
//     <div className='w-full h-full py-2 px-1 flex flex-col gap-4'>
//       {
//         sidedata.map((obj)=>(<NavLink key={obj.id} to={obj.path} onClick={()=>setSideBarSlect(obj)}>
//           <div className={`flex flex-row gap-2 bg-gray-200 font-bold text-md p-2 ${sidebarSelect === obj ? "border-r-4 border-r-blue-600":null} `}>
//           <img src={obj.pic} alt="sidebar" className='h-6 w-6 object-center object-cover' />
//           <h4>{obj.name}</h4>
//         </div>
//         </NavLink>))
//       }
//     </div>
//   )
// }

// export default SideBar

import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  const sidedata = [
    {
      id: 214,
      pic: assets.home_icon,
      name: "DashBoard",
      path: "/"
    },
    {
      id: 22,
      pic: assets.add_icon,
      name: "Add Blogs",
      path: "/addblogs"
    },
    {
      id: 343,
      pic: assets.list_icon,
      name: "Blog List",
      path: "/bloglist"
    },
    {
      id: 44,
      pic: assets.comment_icon,
      name: "Comments",
      path: "/comments"
    }
  ]

  return (
    <div className='w-full h-full py-2 px-1  flex flex-col gap-4'>
      {sidedata.map((obj) => (
        <NavLink
          key={obj.id}
          to={obj.path}
          className={({ isActive }) =>
            `flex flex-row gap-2 items-center justify-center font-bold text-md p-2 rounded-md transition-all duration-200
             ${isActive ? "bg-blue-100 border-r-4 border-blue-600 text-blue-600" : "bg-gray-200 text-gray-800"}`
          }
        >
          <img
            src={obj.pic}
            alt={obj.name}
            className='h-6 w-6 object-center object-cover'
          />
          <h4 className='text-sm tracking-tight hidden md:block'>{obj.name}</h4>
        </NavLink>
      ))}
    </div>
  )
}

export default SideBar

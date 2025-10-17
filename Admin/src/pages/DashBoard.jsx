import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // plugin import
import { RxCross2 } from "react-icons/rx";
dayjs.extend(relativeTime); // plugin को enable करना

import React, { useContext, useState } from 'react'
import {  assets } from '../assets/assets'
import { AppContext } from "../Contexts/Context";

const DashBoard = () => {
const {dashboard_data,deleteBlog,toggleBlog} = useContext(AppContext);

const removeBlog = async(id) => {
const confiremed = window.confirm("Are you sure? you want to delete this blog");
if(confiremed){
  deleteBlog(id);
}
}
  // सिर्फ ज़रूरी properties निकालना
  const result = dashboard_data.recentBlogs.map(({ title, createdAt, isPublished,_id }) => ({
    title,
    createdAt,
    isPublished,
    _id
  }));

  console.log(result);

  return (
    <div className='w-full h-full flex flex-col gap-6 md:p-6 p-2'>

      {/* Top Stats Section */}
      <div className='flex flex-wrap gap-4 bg-gray-100 p-3 rounded-md'>
        {[
          { icon: assets.home_icon, label: "Blogs", value: dashboard_data.blogs },
          { icon: assets.comment_icon, label: "Comments", value: dashboard_data.comments },
          { icon: assets.blog_icon, label: "Drafts", value: dashboard_data.drafts },
        ].map((item, idx) => (
          <div key={idx} className='flex items-center gap-3 bg-gray-200 rounded-md p-3 shadow-sm'>
            <img src={item.icon} alt={item.label} className='h-6 w-6' />
            <div className='flex flex-col items-center'>
              <h4 className='text-blue-700 font-bold'>{item.value}</h4>
              <h3 className='font-semibold text-gray-600'>{item.label}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs Header */}
      <div className='flex items-center gap-3'>
        <img src={assets.dashboard_icon_4} className='h-5 w-5' alt="icon" />
        <h4 className='font-bold text-gray-600 text-lg tracking-wide'>Latest Blogs...</h4>
      </div>

      {/* Recent Blogs Table */}
      <div className='w-full overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-200 text-left text-gray-700'>
              <th className='p-2'>#</th>
              <th className='p-2'>Blog Title</th>
              <th className='p-2'>Date</th>
              <th className='p-2'>Status</th>
              <th className='p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.map((obj, idx) => (
              <tr key={idx} className='border-b hover:bg-gray-50'>
                <td className='p-2'>{idx + 1}</td>
                <td className='p-2 font-semibold text-gray-800'>{obj.title}</td>
                <td className='p-2 text-gray-600'>{dayjs(obj.createdAt).fromNow()}</td>
                <td className={`p-2 font-bold ${obj.isPublished ? "text-green-600" : "text-red-500"}`}>
                  {obj.isPublished ? "Published" : "Draft"}
                </td>
                <td className='p-2'>
                  <div className="flex flex-row gap-4 items-center h-fit w-fit px-2 py-1">
                    <button onClick={()=>toggleBlog(obj._id)} className='tracking-tight font-light text-sm border-[2px] border-green-300 px-2 py-1 rounded-md'>UnPublish</button>
                    {/* delete icons here */}
                    
                    <RxCross2 onClick={()=>removeBlog(obj._id)}  className="text-red-500"/>
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DashBoard

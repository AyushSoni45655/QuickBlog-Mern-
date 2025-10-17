import React, { useContext } from 'react'
import { dashboard_data } from '../assets/assets';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // plugin import
import { AppContext } from '../Contexts/Context';

dayjs.extend(relativeTime); // plugin को enable करना
const BlogList = () => {
  const {blog_data,toggleBlog} = useContext(AppContext);
    // सिर्फ ज़रूरी properties निकालना
    const result = blog_data.map(({ title, createdAt, isPublished,_id }) => ({
      title,
      createdAt,
      isPublished,
      _id
    }));
  
  return (
    <div className='w-full h-fit md:p-6 p-2 flex flex-col gap-4'>
      <h2 className='font-bold text-lg text-green-700 tracking-widest'>All Blogs...</h2>
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
                      <td className='p-2 text-gray-600 text-nowrap'>{dayjs(obj.createdAt).fromNow()}</td>
                      <td className={`p-2 font-bold ${obj.isPublished ? "text-green-600" : "text-red-500"}`}>
                        {obj.isPublished ? "Published" : "Drafts"}
                      </td>
                      <td className='p-2'>
                        <button onClick={()=>toggleBlog(obj._id)}  className='px-4 font-light  text-black border[2px] border-blue-400 py-1 '>Unpublish</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default BlogList

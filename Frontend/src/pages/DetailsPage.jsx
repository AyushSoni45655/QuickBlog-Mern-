import React, { useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/Contexts";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import axios from 'axios';
import {toast} from "react-hot-toast";
dayjs.extend(relativeTime);

const DetailsPage = () => {

  
  const { id } = useParams();
  const { bData, comments,backndUrl } = useContext(AppContext);

  const detailsProduct = bData.find((item) => item._id === id);

  if (!detailsProduct) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading blog details...
      </div>
    );
  }


  
   const [commentsData,setCmmentsData] = useState({
    blog:"" ||id,
    name:"",
    content:""
   })
   const commnetsOnChangeHandler = (e)=>{
    setCmmentsData((prev)=>({...prev,[e.target.name]:e.target.value}))
   }
   const commentsSubmitter = async(e)=>{
    try{
       e.preventDefault();
       const response = await axios.post(`${backndUrl}/api/comment/add`,{blog:commentsData.blog,name:commentsData.name,content:commentsData.content});
       if(response.data.success){
        toast.success(response.data.msg);
       }else{
        toast.error(response.data.msg);
       }
    }catch(e){
      toast.error(e.message);
    }finally{
      setCmmentsData({
        blog:"" || id,
        name:"",
        content:""
      })
    }
   }
   console.log("My Comments Data",commentsData);
   
  return (
    <div className="w-full h-fit flex justify-center pt-20 px-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header Info */}
        <h4 className="tracking-wide font-semibold text-blue-500 mb-2">
          Published on {dayjs(detailsProduct.createdAt).format("MMM D, YYYY")}
        </h4>

        <h1 className="text-3xl sm:text-4xl text-center font-bold text-gray-900 leading-snug mb-3">
          {detailsProduct.title}
        </h1>

        <p className="text-gray-600 text-center text-base sm:text-lg mb-4">
          {detailsProduct.subTitle}
        </p>

        <span className="px-4 py-1 bg-sky-200 text-black rounded-full font-semibold text-sm mb-6">
          Ayush Soni
        </span>

        {/* Blog Image */}
        <div className="w-full h-60 sm:h-96 rounded-lg overflow-hidden shadow-md mb-8">
          <img
            src={detailsProduct.image}
            alt={detailsProduct.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Description */}
        <div
          className="prose max-w-3xl text-gray-800 leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: detailsProduct.description }}
        />

        {/* Comments Section */}
        <div className="w-full">
          <h3 className="font-bold text-gray-800 text-lg mb-4">
            {`Comments (${`${comments.filter((obj)=>obj.blog === id).length}`})`}
          </h3>

          {comments.length > 0 ? (
            comments.filter((obj)=>obj.blog === id).map((cmt) => (
              <div
                key={cmt._id}
                className="flex flex-row gap-4 p-4 bg-gray-100 rounded-lg mb-3"
              >
                <div className="h-10 w-10 flex items-center justify-center bg-gray-300 rounded-full">
                  <CiUser className="text-2xl text-gray-700" />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-gray-800">{cmt.name}</h3>
                  <p className="text-gray-600 text-sm">{cmt.content}</p>
                </div>
                <h5 className="text-gray-500 text-xs whitespace-nowrap">
                  {dayjs(cmt.createdAt).fromNow()}
                </h5>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic mb-6">No comments yet.</p>
          )}
        </div>

        {/* Add Comment Box */}
        <div className="flex flex-col gap-3 w-full bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
          <h2 className="font-bold text-green-600 text-lg">
            Add Your Comment
          </h2>
          <form className="flex flex-col gap-4" onSubmit={commentsSubmitter}>
              <input
            type="text"
            placeholder="Enter your name..."
            name="name"
            value={commentsData.name}
            onChange={commnetsOnChangeHandler}
            className="h-12 w-full pl-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all"
          />

          <textarea
            name="content"
             value={commentsData.content}
            onChange={commnetsOnChangeHandler}
            placeholder="Write your message..."
            className="w-full h-40 p-3 border border-gray-300 rounded-md outline-none resize-none focus:border-blue-500 transition-all"
          ></textarea>

          <input type="submit" value="Submit"  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all w-fit"/>
         
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

import React, { useContext, useEffect, useState } from "react";
import {  assets } from "../assets/assets";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdDeleteForever } from "react-icons/md";
import { AppContext } from "../Contexts/Context";
import toast from "react-hot-toast";
import axios from "axios";

dayjs.extend(relativeTime);

const CommentsPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const {comments,ALLBlogs} = useContext(AppContext)
  const commentType =  ['Approved','Not Approved'];
  const [activeComment,setActive] = useState(commentType[0]);
  const [latestComment,setLatest] = useState([]);
useEffect(()=>{
  if(comments?.length){
    const filter = comments.filter((obj)=>activeComment === 'Approved'? obj.isApproved  === true : obj.isApproved === false);
    setLatest(filter);
  }
},[activeComment,comments]);

const {approveOrNot,deleteComment} = useContext(AppContext);
const permisionedDeleteComment = async(id)=>{
  const confirmation = window.confirm('Are you sure? you want to delete');
  if(confirmation){
    await deleteComment(id);
  } 
}
  return (
    <div className="w-full h-fit flex flex-col gap-6 md:px-8 px-3 py-4">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-lg text-gray-900 tracking-wide">
          Comments
        </h2>
        <div className="flex gap-3 flex-wrap">
          {
            commentType.map((val,idx)=>(<button key={idx} onClick={()=>setActive(val)} className={`${val === activeComment ? "border-2 border-green-800":null} font-semibold text-sm md:text-md  rounded-lg  px-4 py-1 hover:bg-gray-100 transition`}>
            {val}
          </button>))
          }
          
        
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-3 font-bold text-gray-800 tracking-wide border-b border-gray-400 pb-2">
        <h3>Blog Title & Comment</h3>
        <h3>Date</h3>
        <h3>Action</h3>
      </div>

      {/* Comments List */}
      <div className="flex flex-col divide-y divide-gray-300">
        {latestComment.map((obj) => (
          <div
            key={obj._id}
            className="flex flex-col md:grid md:grid-cols-3 items-start md:items-center gap-3 py-4"
          >
            {/* Blog & Comment Info */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-900">
                Blog:{" "}
                <span className="text-gray-500 font-normal">
                  {ALLBlogs.find((objj)=>objj._id === obj.blog)?.title || "Untitled"}
                </span>
              </p>
              <p className="font-semibold text-gray-900">
                Name:{" "}
                <span className="text-gray-500 font-normal">{obj.name}</span>
              </p>
              <p className="font-semibold text-gray-900">
                Comment:{" "}
                <span className="text-gray-500 font-normal">
                  {obj.content}
                </span>
              </p>
            </div>

            {/* Date */}
            <h4 className="text-sm text-gray-600">
              {dayjs(obj.createdAt).fromNow()}
            </h4>

            {/* Action Buttons */}
            <div className="flex gap-3 items-center">
              <img
              onClick={()=>approveOrNot(obj._id)}
                src={assets.tick_icon}
                alt="approve"
                className="h-5 w-5 cursor-pointer hover:scale-110 transition"
              />
              <MdDeleteForever onClick={()=>permisionedDeleteComment(obj._id)} className="h-6 w-6 text-red-600 cursor-pointer hover:scale-110 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;

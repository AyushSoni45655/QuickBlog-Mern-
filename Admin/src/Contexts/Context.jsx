import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios';

import {toast} from "react-hot-toast";

import { blogCategories } from "../assets/assets";
import { showSequentialToast } from "../helpers/toaster";


export const AppContext = createContext();
export const ContextProvider = ({children})=>{


   const [token,setToken] = useState(localStorage.getItem('token') || "");

// backnd url is a 
const banckendUrl = import.meta.env.VITE_BACKEND_URL;
console.log(banckendUrl);

// add blog data implementation here

const [addBlogData, setAddBlogData] = useState({
    image: "",
    title: "",
    subTitle: "",
    description: "",
    category: blogCategories[0],
    isPublished: false,
  });
const [ALLBlogs,setAllBlogs] = useState([]);
  const [blog_data,set_blog_data] = useState([]);

  const recviveBlogs = async()=>{
    try{

      const responce = await axios.post(`${banckendUrl}/api/blog/get`,{},{headers:{token:token}});
      
      
      if(responce.data.success){
        console.log(responce.data.blogs);
        
        console.log(responce);
        setAllBlogs(responce.data.blogs)
        set_blog_data(responce.data.blogs)
         showSequentialToast(responce.data.msg,'success');
      }else{
         showSequentialToast(responce.data.msg,'error');
        
      }
      
      
    }catch(e){
       showSequentialToast(e.message,'error');
     
    }
  }

  useEffect(()=>{
    recviveBlogs();
  },[token]);

    // recive all blogs in backend
  const [comments,setComments] = useState([]);

  // recive all comments from backend

  // const getComment here
  const allComments = async()=>{
    try{
      const response = await axios.post(`${banckendUrl}/api/comment/allComment`);
      if(response.data.success){
        setComments(response.data.comments);
       
         showSequentialToast(response.data.msg,'success');
      }else{
         showSequentialToast(response.data.msg,'error');
        
      }
    }catch(e){
       showSequentialToast(e,'error');
      
    }
  }
  useEffect(()=>{
    allComments();
  },[token]);
 
  // approved or not approved functionality here
  
  const approveOrNot = async(id)=>{
    try{
      const response = await axios.post(`${banckendUrl}/api/comment/toggle`,{id:id});
      if(response.data.success){
        allComments()
         showSequentialToast(response.data.msg,'success');
        
      }else{
         showSequentialToast(response.data.msg,'error');
         
      }
    }catch(e){
       showSequentialToast(e.message,'error');
    }
  }

  const deleteComment = async(id)=>{
    try{
      const response = await axios.post(`${banckendUrl}/api/comment/delete`,{id:id});
      
      if(response.data.success){
        
         showSequentialToast(response.data.msg,'success');
      }else{
        
         showSequentialToast(response.data.msg,'error');
      }

    }catch(e){
      
       showSequentialToast(e.message,'error');
    }
  }
  
  

  // 🟢 Input Change Handler
  const handlerAddBlogOnChange = (e) => {
    const { name, value, type, checked, files } = e.target;



    if (name === "image" && files && files[0]) {
  setAddBlogData((prev) => ({
    ...prev,
    image: files[0], // ✅ file object directly store करो
    preview: URL.createObjectURL(files[0]), // 👀 image preview के लिए optional
  }));
  return;
}
    // ✅ Checkbox handle
    if (type === "checkbox") {
      setAddBlogData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    // ✏️ Normal text & select input handle
    setAddBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ❌ Remove Image Handler
  const handleRemoveImage = () => {
    setAddBlogData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // 🟢 Form Submit
  const handlerAddBlogSubmitter = async(e) => {
    e.preventDefault();
   try{
   const formData = new FormData();
formData.append("title", addBlogData.title);
formData.append("subTitle", addBlogData.subTitle);
formData.append("description", addBlogData.description);
formData.append("category", addBlogData.category);
formData.append("isPublished", addBlogData.isPublished);
formData.append("image", addBlogData.image);
    const responce = await axios.post(`${banckendUrl}/api/blog/add`,formData,{headers:{token:token, "Content-Type": "multipart/form-data",}});
    console.log(responce.data);
    if(responce.data.success){
     
       showSequentialToast(responce.data.msg,'success');
    }else{
       
         showSequentialToast(responce.data.msg,'error');
    }
    
   }catch(e){
     showSequentialToast(e.message,'error');
   }finally{
    setAddBlogData({
      image:"",
      title:"",
      subTitle:"",
      description:"",
      category:blogCategories[0],
      isPublished:false
    })
   }
  };


  
  // blog toggle functionality here implemented
  const toggleBlog = async(id)=>{
    try{
      const responce = await axios.post(`${banckendUrl}/api/blog/toggle`,{id:id},{headers:{token:token}});
      if(responce.data.success){
        recviveBlogs();
      
         showSequentialToast(responce.data.msg,'success');
      }else{
       
         showSequentialToast(responce.data.msg,'error');
      }
    }catch(e){
       showSequentialToast(e.message,'error');
      
    }
  }

  // delete blog implementsation here
  const deleteBlog = async(id)=>{
    try{
      const response = await axios.post(`${banckendUrl}/api/blog/delete`,{id:id},{headers:{token:token}});
      if(response.data.success){
        recviveBlogs();
        showSequentialToast(response.data.msg,'success');
      }else{
        
         showSequentialToast(response.data.msg,'error');
      }
    }catch(e){
      toast.error(e.message);
    }
  }

  // DashBoardData here implemented
   const dashboard_data = {
      "blogs": blog_data.length,
      "comments": comments.length,
      "drafts": blog_data.filter((obj)=>obj.isPublished === false).length,
    "recentBlogs":blog_data .filter(obj => obj.isPublished === true).sort((a, b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5)     
  }
  // Signin functionality implemented here
    const [adminSignin, setSignIn] = useState({
    email:"",
    password:""
  });
  const signinOnChangeHandler = (e)=>{
    setSignIn((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const signinSubmitHandler = async()=>{
    try{
      const responce = await axios.post(`${banckendUrl}/api/user/admin`,{email:adminSignin.email,password:adminSignin.password});
      console.log(responce);
      
      if(responce.data.success){
        setToken(responce.data.token);
        localStorage.setItem('token', responce.data.token);
         showSequentialToast(responce.data.msg,'success');
        return true;
      }else{
        showSequentialToast(responce.data.msg,'error');
        
        return false;
      }

    }catch(e){
      toast.error(e.message);
      return false;
    }
  }

  // logout functionality here implemented

  const logout = ()=>{
    setToken("");
    localStorage.removeItem('token')
  }

 
  const values = {handlerAddBlogSubmitter,handleRemoveImage,setAddBlogData,handlerAddBlogOnChange,toggleBlog,addBlogData,blog_data,set_blog_data,dashboard_data,deleteBlog,comments,ALLBlogs,approveOrNot,deleteComment,
    token,setToken,adminSignin,setSignIn,signinOnChangeHandler,signinSubmitHandler,logout}
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
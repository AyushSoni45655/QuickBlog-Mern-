import { createContext,useEffect,useState } from "react";
import {blogCategories,comments_data} from "../assets/assets.js"
export const AppContext = createContext();
import {toast} from 'react-hot-toast'
import axios from 'axios';
export const ContextProvider = ({children})=>{

   const [token,setToken] = useState(localStorage.getItem('token') || "");    
   const backndUrl  = import.meta.env.VITE_BACKEND_URL;
   const [allBlogs, setAllBlogs] = useState([]);
     const [bData,setBData] = useState([]);

       // all blogs here 
 
 const getAllBlogs = async()=>{
  try{
    const response = await axios.post(`${backndUrl}/api/blog/get`,{},{headers:{token:token}});
    if(response.data.success){
      setAllBlogs(response.data.blogs)
      setBData(response.data.blogs);
      toast.success(response.data.msg);
    }else{
      toast.error(response.data.msg);
    }
  }catch(e){
    toast.error(e.message);
    
  }
 }
 useEffect(()=>{
  getAllBlogs();
},
[token]
)
  

                                                                         // blogs category name list here
 const [tabItem, setTabItem] = useState(blogCategories[0]);

// comments data here
const [comments,setComments] = useState([]);

const getAllCommentsHandler = async()=>{
  try{
    const response = await axios.post(`${backndUrl}/api/comment/allComment`);
    if(response.data.success){
      setComments(response.data.comments)
       toast.success(response.data.msg);
    }else{
      toast.error("try after some time...")
    }
   
  }catch(e){
toast.error(e.message);
  }
}


                                                                        // search functionality here implementedd
const [searchText,setSearchText] = useState("");
                                                                        //  cards functionality here implemented

  const cardsDataHandler = () => {
    let filteredData = allBlogs;

    // ✅ Category Filter
    if (tabItem !== "All") {
      filteredData = filteredData.filter(
        (item) => item.category === tabItem
      );
    }

    // ✅ Search Filter
    if (searchText.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().startsWith(searchText.toLowerCase())
      );
    }

    setBData(filteredData);
  };

  /* 🔹 Automatically Filter when Category or Search Changes */
  useEffect(() => {
    cardsDataHandler();
     getAllCommentsHandler();
  }, [tabItem, searchText,token]);




                                                                    // signUp functionality here

  
                                                                
  const [signUpData,setSignUpData] = useState({
    name:"",
    email:"",
    password:""
  });
   const signUpOnChangeHandler = async(e)=>{
    setSignUpData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const signUpSubmitHandler = async()=>{
try{
const responce = await axios.post(`${backndUrl}/api/user/signup`,{name:signUpData.name,email:signUpData.email,password:signUpData.password});
if(responce.data.success){
  setToken(responce.data.token);
  localStorage.setItem('token', responce.data.token);
  toast.success(responce.data.msg)
  return true;
}else{
  toast.success(responce.data.msg)
  return false;
}
console.log(responce.data);

}catch(e){
toast.error(`Signup error ${e.message}`);
return false;
}
  }

  // logout functionality here implemented

  const logout = ()=>{
    try{
      setToken("");
      localStorage.removeItem('token')
      toast.success("LogOut Done")
    }catch(e){
      toast.error("LogOut failed",e.message);
    }
  }

                                                                    // sign In Functionality here implemented

    const [signInData,setSignInData] = useState({
    email:"",
    password:""
  });
   const signInOnChangeHandler = async(e)=>{
    setSignInData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const signInSubmitHandler = async()=>{
try{
const responce = await axios.post(`${backndUrl}/api/user/signin`,{email:signInData.email,password:signInData.password});
if(responce.data.success){
  setToken(responce.data.token)
  localStorage.setItem('token', responce.data.token);
  toast.success(responce.data.msg);
  return true;
}else{
  toast.error(responce.data.msg);
  return false;
}
}catch(e){
  toast.error("SignIn Error",e.message);
  return false;
}
  }


  const values = {tabItem,setTabItem,blogCategories,bData,searchText,setSearchText,comments,setComments,token,logout,
    setSignInData,signInData,signInOnChangeHandler,signInSubmitHandler,signUpData,setSignUpData,signUpOnChangeHandler,signUpSubmitHandler,backndUrl}
return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
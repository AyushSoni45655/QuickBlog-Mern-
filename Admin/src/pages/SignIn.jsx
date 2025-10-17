import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts/Context";
export default function SignIn() {
  const navigate = useNavigate();
  const {adminSignin,setSignIn,signinOnChangeHandler,signinSubmitHandler} = useContext(AppContext);

  const submitter = async(e)=>{
    e.preventDefault();
    const success = await signinSubmitHandler();
    if(success)navigate("/",{replace:true})
  }
console.log(adminSignin);

    return (
        <div className="w-full min-h-screen bg-black flex items-center justify-center">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
                <h2 className="text-2xl font-semibold">Admin Panel</h2>
                <p className="text-slate-300 mt-1">Login to your account</p>
                <form  onSubmit={submitter} className="mt-8" >
                    <label htmlFor="email" className="block mb-1 font-medium text-slate-300">Email address</label>
                    <input type="email" id="email" name="email" value={adminSignin.email} onChange={signinOnChangeHandler} placeholder="Email" className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500" />
            
                    <label htmlFor="password" className="block mb-1 font-medium text-slate-300">Password</label>
                    <input type="password" id="password" name="password" value={adminSignin.password} onChange={signinOnChangeHandler}  placeholder="Password" className="w-full p-2 mb-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500" />
                    <div className="text-right">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                    <input type="submit" value="SignIn" className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                   
                </form>
            </div>
        </div>
    );
};
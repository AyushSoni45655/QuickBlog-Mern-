import { useContext } from "react";
import { TbLockPassword } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/Contexts";
export default function SignUp() {
  const {signUpData,setSignInData,signUpOnChangeHandler,signUpSubmitHandler} = useContext(AppContext);
  const navigate = useNavigate();
  
  const signUpSubmitter = async(e)=>{
    e.preventDefault();
    const success = await signUpSubmitHandler();
    if(success)navigate("/",{replace:true})
  }
console.log(signUpData);

    return (
        <form onSubmit={signUpSubmitter} style={{backgroundImage: `url(${assets.backb})`,backgroundSize:"cover",backgroundPosition:"center"}} className="flex flex-col items-center h-screen w-full justify-center text-sm text-white">
            
            <h1 className="text-4xl font-bold text-green-700 py-4 text-center">Let’s Create An Account!!!</h1>
            <p className="max-md:text-sm text-green-800 font-bold pb-10 tracking-wider text-center">
                Or just reach out manually to us 
            </p>
            
            <div className="max-w-96 w-full px-4">
                <label htmlFor="name" className="font-medium">Full Name</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#475569"/>
                    </svg>
                    <input type="text" name="name" value={signUpData.name} onChange={signUpOnChangeHandler} className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your full name" required />
                </div>
        
                <label htmlFor="email" className="font-medium mt-4">Email Address</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z" fill="#475569"/>
                    </svg>
                    <input type="email" name="email" value={signUpData.email} onChange={signUpOnChangeHandler} className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your email address" required />
                </div>
        
                {/* password */}
                 <label htmlFor="password" className="font-medium mt-4">Password</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <TbLockPassword className="h-6 w-6" />
                    <input type="password" name="password" value={signUpData.password} onChange={signUpOnChangeHandler} className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your  password" required />
                </div>

                {/* submition button here */}
                <input type="submit" value={"Submit"} className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition"  />
                <div className="flex  gap-2 items-center justify-center mt-4 font-bold ">
                  <h6 className="text-md">Already have an account?</h6>
                  <NavLink to={"/signin"}><p className="text-green-500 text-lg tracking-wider">Login</p></NavLink>
                </div>
            </div>
        </form>
    );
};
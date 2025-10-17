import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 border-t-[1px] border-t-gray-300 mt-10">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                   <img src={assets.logo} alt="" />
                    <p className="mt-6 text-sm">
                        QuickBlog is a creative blogging platform built for writers, readers, and thinkers.
Our mission is to connect passionate minds through words and ideas — where technology meets creativity.
                    </p>
                </div>
                <div className="flex-1 flex-wrap items-center justify-center flex  md:justify-end gap-20">
                  {/* 1 */}
                    <div>
                        <h2 className="font-semibold mb-2 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2 flex flex-col font-bold">
                        {
                            ["Home","About Us","Contact Us","Privacy Policy"].map((val,index)=><NavLink key={index}>{val}</NavLink>)
                        }
                         
                        </ul>
                    </div>
                    {/* 2 */}
                     <div >
                        <h2 className="font-semibold mb-2 text-gray-800">Need Help?</h2>
                        <ul className="text-sm space-y-2 flex flex-col font-bold">
                        {
                            ["Delivery Information","return & refund Policy","Payment Methods","Track Your Ordr","Contact"].map((val,index)=><NavLink key={index}>{val}</NavLink>)
                        }
                         
                        </ul>
                    </div>
                    {/* 3 */}
                    <div>
                        <h2 className="font-semibold mb-2 text-gray-800">Follow Us</h2>
                        <ul className="text-sm space-y-2 flex flex-col font-bold">
                        {
                            ["Twitter","Instagram","Linkedin","FaceBook","YouTube"].map((val,index)=><NavLink key={index}>{val}</NavLink>)
                        }
                         
                        </ul>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2025 © QuickBlog. All Right Reserved.
            </p>
        </footer>
    );
};
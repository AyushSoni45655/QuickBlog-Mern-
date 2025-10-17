import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
const auth = async(req,res,next)=>{
  const {token} = req.headers;
  try{
     jwt.verify(token, process.env.JWT_SECRET);
     next();
  }catch(e){
    res.json({success:false,msg:e.message});
  }
}
export default auth;
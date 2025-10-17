import hashGenrator from "../helpers/hash.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import validator from 'validator';
import dotenv from 'dotenv';
dotenv.config();
const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET);
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    // 🔹 Step 1: Input Validation
    if (!email || !password) {
      return res.json({
        success: false,
        msg: "कृपया ईमेल और पासवर्ड दर्ज करें!",
      });
    }

    // 🔹 Step 2: यूज़र को Database में ढूंढें
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        msg: "User मौजूद नहीं है!",
      });
    }

    // 🔹 Step 3: पासवर्ड compare करें (hashed password के साथ)
    const isMatch = await bcrypt.compare(password, user.password);

    // 🔹 Step 4: अगर पासवर्ड सही है → JWT टोकन बनाएं
    if (!isMatch) {
      return res.json({
        success: false,
        msg: "Invalid Credentials ❌",
      });
    }

    const token = createToken(user._id);

    // 🔹 Step 5: Success Response
    return res.json({
      success: true,
      msg: "Login Successful ✅",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    console.log("Login Error:", e.message);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

const signUp = async(req,res,next)=>{
  try{
    const { email , password, name } = req.body;
    // checking user is exist or not
    const userExist = await userModel.findOne({email});
    if(userExist){
     return res.json({success:false,msg:"User Already exist!!!"});
    }
    if(!validator.isEmail(email)){
      return res.json({success:false,msg:"Invalid mail !!"});
    }
    if(password.length < 8){
      return res.json({success:false,msg:"Password should be 8 digit or more !!"});
    }
    
    const hashPassword = await hashGenrator(password);
    const newUser = new userModel({
      name:name,
      email:email,
      password:hashPassword
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    console.log("Token is a ",token);
    
    res.json({success:true,msg:"SignUp Completed",token:token});
  }catch(e){
    console.log(e);
     res.json({success:false,msg:e.message})    
  }
}

const adminLogin = async(req,res,next)=>{
  try{
    const {email,password} = req.body;
    if(email === ""  || password === ""){
      return res.json({success:false,msg:"Input filds are missing"});
    }
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       const token = jwt.sign({email},process.env.JWT_SECRET,{ expiresIn: "1d" });
     return res.json({success:true,msg:"Login completed",token:token})
      
    }else{
      return res.json({success:false,msg:"credential is not valid!!!"});
    }
    
  }catch(e){
    console.log(e);
    res.json({success:false,msg:e.message})
    
  }
}
export {
  signIn,signUp,adminLogin
}
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cors from "cors";
import mongoDB from "./config/mongo.js";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import commentRouter from "./routes/comment.js";
 const port =  process.env.PORT || 6000;

//  cors connection here
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
]
app.use(cors({
  origin:function (origin,callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error("Not Allowed by cors"))
    }
  },
   methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))
// middlwares
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// mongodb setup here
mongoDB();
// endPoints
// user endpoint here
app.use("/api/user",userRouter);
// blog endpoint here
app.use("/api/blog",blogRouter);
// comments endPoint here
app.use('/api/comment',commentRouter)

// middleware default
app.use("/",(req,res,next)=>{
  res.send("connection is working")
});

 app.listen(port,(error)=>{
  if(error){
    throw error
  }else{
    console.log(`The server is running on the http://localhost:${port}`);
  }

  
  
 })
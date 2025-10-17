import express from "express";
const blogRouter = express.Router();
import { addBlog,getALlBlogs ,getBlogsByiD ,deleteBlogById,toggleIsPublished} from "../controllers/blogcontrollers.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";


blogRouter.post("/add",upload.single('image'),auth,addBlog)
blogRouter.post("/get",auth,getALlBlogs);
blogRouter.post("/single",auth,getBlogsByiD);
blogRouter.post("/delete",auth,deleteBlogById);
blogRouter.post("/toggle",auth,toggleIsPublished);
export default blogRouter;
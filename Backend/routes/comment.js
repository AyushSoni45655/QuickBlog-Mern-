import express from 'express';
const commentRouter = express.Router();
import {addComment,getBlogComment,getAllComments,toggleComment,removeComment} from '../controllers/commentsControllers.js'
commentRouter.post("/add",addComment);
commentRouter.post("/getComment",getBlogComment);
commentRouter.post("/allComment",getAllComments);
commentRouter.post("/toggle",toggleComment);
commentRouter.post("/delete",removeComment)
export default commentRouter;
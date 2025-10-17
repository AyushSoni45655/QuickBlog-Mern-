import mongoose from 'mongoose';

 const commentSchema = new mongoose.Schema({

  blog:{
    type:mongoose.Schema.Types.ObjectId,ref:'Blog',required:true
  },
  name:{
    type:String,
    required:true,
    unique:false
  },
  content:{
    type:String,
    required:true,
    unique:false
  },
  isApproved:{
    type:Boolean,
    default:false
  }
 },
 {timestamps:true}
);

 const commentsModel = mongoose.models.Comment || mongoose.model('Comment',commentSchema,'comments');
 export default commentsModel;
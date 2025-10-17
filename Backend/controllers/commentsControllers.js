

import commentsModel from "../models/comment.js";

// 🟢 Add Comment Controller
const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    // ✅ Basic validation
    if (!blog || !name || !content) {
      return res.status(400).json({
        success: false,
        msg: "All fields (blog, name, content) are required!",
      });
    }

    // ✅ Create new comment
    const newComment = await commentsModel.create({
      blog,
      name,
      content,
    });

    res.status(201).json({
      success: true,
      msg: "Comment added for review!",
      comment: newComment,
    });
  } catch (e) {
    console.error("Error adding comment:", e);
    res.status(500).json({ success: false, msg: e.message });
  }
};

// 🟢 Get Comments for a Blog
const getBlogComment = async (req, res) => {
  try {
    const {id} = req.body;
console.log("Blog ID:",id);
    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Blog ID is required!",
      });
    }

    // ✅ Find approved comments for the blog
    const comments = await commentsModel
      .find({ blog: id, isApproved:true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      msg: "Comments fetched successfully!",
      comments,
    });
  } catch (e) {
    console.error("Error fetching comments:", e);
    res.status(500).json({ success: false, msg: e.message });
  }
};

// get all the blogs

const getAllComments = async(req,res)=>{
  try{
    const comments = await commentsModel.find({});
    res.status(200).json({success:true,msg:"Comments Fetched",comments:comments});
  }catch(e){
    res.status(500).json({success:false,msg:e.message})
  }
}

// toggle Comments here
const toggleComment = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, msg: "Comment ID is required!" });
    }

    const comment = await commentsModel.findById(id);  // ✅ correct method

    if (!comment) {
      return res.status(404).json({ success: false, msg: "Comment not found!" });
    }

    comment.isApproved = !comment.isApproved;
    await comment.save();

    res.status(200).json({
      success: true,
      msg: "Comment approval status updated!",
      updatedComment: comment,
    });
  } catch (e) {
    console.error("Error toggling comment:", e);
    res.status(500).json({ success: false, msg: e.message });
  }
};

// ✅ Delete Comment Controller


 const removeComment = async (req, res) => {
  try {
    const { id } = req.body; // या req.params.id भी यूज़ कर सकते हैं

    // 🛑 Check if id is provided
    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "Comment ID is missing!" });
    }

    // 🗑️ Delete comment by ID
    const deletedComment = await commentsModel.findByIdAndDelete(id);

    // 🧾 Check if comment existed
    if (!deletedComment) {
      return res
        .status(404)
        .json({ success: false, msg: "Comment not found!" });
    }

    // ✅ Success response
    res.status(200).json({
      success: true,
      msg: "Comment deleted successfully!",
      deletedComment, // optional: return deleted data if you need
    });
  } catch (e) {
    console.error("Error deleting comment:", e);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: e.message,
    });
  }
};


export { addComment, getBlogComment ,getAllComments,toggleComment,removeComment};



import fs from 'fs';
import imagekit from '../config/imagkit.js';
import blogModel from '../models/blog.js';

const addBlog = async(req,res,next)=>{
  try{
    const {title,subTitle,description,category,isPublished} = req.body;
    const image = req.file;
    console.log("I am a req.body here",req.body);
    console.log("I am a req.fil section here",req.file);
    
    
    if(!title || !subTitle || !description || !category || !isPublished || !image){
      return res.json({success:false,msg:"Missing requirds fields !!!"})
    }

    const fBuffer = fs.readFileSync(image.path);

    // upload image to imag kit
    const responce =  await imagekit.upload({
      file:fBuffer,
      fileName:image.originalname,
      folder:"/qBlogs"
    })

    // optimejeg image and transform url
    const optimizedImage = imagekit.url({
      path:responce.filePath,
      transformation:[
        {quality:'auto'},
        {width:'1280'},
        {format:'webp'}
      ]
    });
    const imagee = optimizedImage;
    await blogModel.create({
      title:title,
      subTitle:subTitle,
      description:description,
      category:category,
      isPublished:isPublished,
      image:imagee
    });
    res.json({success:true,msg:"Blog Uploaded Successfully!!!"});
  }catch(e){
    console.log(e);
    res.json({success:false,msg:e.message})
    
  }
}


const getALlBlogs = async(req,res,next)=>{
  try{
    const blogs = await blogModel.find({});
    res.json({success:true,msg:"Blogs Fetched Successfully" ,blogs:blogs});
  }catch(e){
    res.json({success:false,msg:e.message});
  }
}

// get blogs by the id function here

const getBlogsByiD = async(req,res,next)=>{
  try{
    const {id} = req.body;
    const blog = await blogModel.findById(id)
    if(!blog){
      return res.json({success:false,msg:"Blog Not Found"});
    }

     res.json({success:true,msg:"Blog fetched",blog:blog});
  }catch(e){
    console.log(e.message);
    
     res.json({success:false,msg:e.message});
  }
}

const deleteBlogById = async(req,res,next)=>{
  try{
    const {id} = req.body;
    const deletedBlog = await blogModel.deleteOne({_id:id});
    if(deletedBlog.deletedCount > 0){
     return res.json({success:true,msg:"Blog Deleted"});
    }else{
      return  res.json({success:false,msg:"Blog Not Deleted"});
    }
   
  }catch(e){
    console.log(e.message);
     res.json({success:false,msg:e.message});
  }
}

const toggleIsPublished = async(req,res,next)=>{
  try{
    const {id} = req.body;
    const blog = await blogModel.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
     res.json({success:true,msg:"Blog isPublishd Updated"});
  }catch(e){
    console.log(e.message);
     res.json({success:false,msg:e.message});
  }
}
export {addBlog,getALlBlogs,getBlogsByiD,deleteBlogById,toggleIsPublished}
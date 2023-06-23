const Post = require('../models/postModel')

const createPost = async(req,res)=>{
  try {
    const {title,date} = req.body
    const image = req.file.filename
    const post = await Post({
          title:title,
          date:date,
          image:image
    })
    const postData = await post.save();
    res.status(200).send({success:true,msg:'post Data',data:postData})
  } catch (error) {
     console.log(error)
     res.status(400).send({success:false,msg:error.message}) 
  }
}

const getPosts = async(req,res)=>{
   try{
     const posts = await Post.find({});
     res.status(200).send({success:true,msg:'Posts Data',data:posts});
   }catch(error){
    res.status(400).send({success:false,msg:error.message})
   }
}

const deletePost = async(req,res)=>{
  try{
       const id = req.params.id;
       await Post.deleteOne({_id:id});
       res.status(200).send({success:true,msg:'Posts Data successflly'});
  }catch(error){
    res.status(400).send({success:false,msg:error.message})
  }
}

const updatePost = async(req,res)=>{
  try {
    if (req.file !== undefined) {
      var id = req.body.id;
      var title = req.body.title;
      var date=req.body.date;
      var filename = req.file.filename;

      await Post.findByIdAndUpdate({_id:id},{$set:{title:title,date:date,image:filename}});
      res.status(200).send({success:true,msg:'Posts upDatad successflly'});
    } else {
      var id = req.body.id;
      var title = req.body.title;
      var date=req.body.date;
      var filename = req.file.filename;

      await Post.findByIdAndUpdate({_id:id},{$set:{title:title,date:date}});
      res.status(200).send({success:true,msg:'Posts upDatad successflly'});
    }
  } catch (error) {
    res.status(400).send({success:false,msg:error.message})
  }
}

const search = async(req,res)=>{
  try{
      const data = await Post.find({$or:[{title:req.body.title},{date:req.body.date}]})
      // await data.save()
      if(data==null){
        console.log("data not found");
      }
      console.log(data);
      res.json({msg:"done",data:data})
  }catch(error){
    res.status(400).send({success:false,msg:error.message})
  }
}

const filter = async(req,res)=>{
  try{
      const data = await Post.find({},{"title":1,_id:0}).sort({"title":-1})

      // await data.save()
      if(data==null){
        console.log("data not found");
      }
      console.log(data);
      res.json({msg:"done",data:data})
  }catch(error){
    res.status(400).send({success:false,msg:error.message})
  }
}

// const pagination =async(req,res)=>{
//   let {page,limit,sort,asc} = req.query;
//   if(!page) page=1;
//   if(!limit) limit=10
//   const skip =(page - 1) * 10;
//   const total = await Post.countDocuments();
  
//   const users = await Post.find().sort({[sort]:-1}).skip(skip).limit(limit);
//   res.send({page:page,limit:limit,users:users})

// }

const pagination = async (req, res) => {
  try {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

      const skip = (page -1) * size;

      const total = await Post.countDocuments();
      const users = await Post.find().skip(skip).limit(size);

      res.json({
          records: users,
          total,
          page, 
          size
      });
  } catch(error) {
      console.log(error)
      res.status(400).json(error)
  }
};

const pagination2 = async (req, res) => {
  try {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

       const skip = (page -1) * size;

       const total = await Post.countDocuments();
       const users = await Post.find().skip(skip).limit(size);

      res.json({
          records: users,
          total,
          page, 
          size
      });
  } catch(error) {
      console.log(error)
      res.status(400).json(error)
  }
};

module.exports = {
    createPost,getPosts,deletePost,updatePost,search,filter,pagination,pagination2
}
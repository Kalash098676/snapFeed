require("dotenv").config();
const express = require("express");
const multer = require('multer')
const uploadFile = require('./services/storage.service')
const postModel= require("./models/post.model")
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());  //used only for raw data

const upload = multer({ storage:multer.memoryStorage()})//used for file

    app.post('/create-post', upload.single("image"), async (req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const result = await uploadFile(req.file.buffer)
    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    })
    console.log(result);
    return res.status(201).json({
        message:"Post created",
        post

    })
})
app.get("/posts", async (req, res) => {
    const posts = await postModel.find()

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
})
app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = app;
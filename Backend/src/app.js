require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();

    return res.status(200).json({
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = app;

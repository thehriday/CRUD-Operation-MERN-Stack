const Post = require("../models/Post");

exports.addPost = (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ msg: "Please include right body" });
  }
  const post = new Post({ title, body });
  post
    .save()
    .then(post => {
      return res
        .status(201)
        .json({ msg: "Successfully post created !!", post });
    })
    .catch(err => {
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ msg: "Please include right body" });
  }
  Post.findByIdAndDelete(_id)
    .then(result => {
      if (result) {
        return res
          .status(200)
          .json({ msg: "Successfully post deleted !!", result });
      }
      return res.status(400).json({ msg: "user not found with this id" });
    })
    .catch(err => {
      next(err);
    });
};

exports.updatePost = async (req, res, next) => {
  try {
    const { _id, title, body } = req.body;
    if (!_id) {
      return res.status(400).json({ msg: "Please include right body" });
    }
    const result = await Post.findById(_id);
    if (!result) {
      return res.status(400).json({ msg: "post not found with this id" });
    }
    result.title = title;
    result.body = body;

    const updatedPost = await result.save();
    return res
      .status(200)
      .json({ msg: "Successfully post deleted !!", updatedPost });
  } catch (err) {
    next(err);
  }
};

exports.searchPost = async (req, res, next) => {
  try {
    const { postTitle } = req.params;
    const { skipNum = 0 } = req.query;

    if (!postTitle) {
      return res
        .status(400)
        .json({ msg: "Please include title for search a post" });
    }
    const result = await Post.find({ title: new RegExp(postTitle, "i") })
      .sort({ createdAt: -1 })
      .skip(Number(skipNum))
      .limit(10);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllPost = async (req, res, next) => {
  try {
    const { skipNum = 0 } = req.query;

    const result = await Post.find()
      .sort({ createdAt: -1 })
      .skip(Number(skipNum))
      .limit(10);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

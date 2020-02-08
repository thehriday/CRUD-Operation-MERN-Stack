const express = require("express");

const router = express.Router();

const postController = require("../controllers/postController");

router.post("/add_post", postController.addPost);

router.delete("/delete_post", postController.deletePost);

router.put("/update_post", postController.updatePost);

router.get("/search_post/:postTitle", postController.searchPost);

router.get("/get_all_post", postController.getAllPost);

module.exports = router;

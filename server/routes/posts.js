import express, { application } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts); // http://localhost:5000/posts;
router.post("/", auth, createPost); // http://localhost:5000/posts;
router.patch("/:id", auth, updatePost); // http://localhost:5000/posts/1;
router.delete("/:id", auth, deletePost); // http://localhost:5000/posts/1;
router.patch("/:id/likePost", auth, likePost); // http://localhost:5000/posts/1/likePost;

export default router;

const express = require('express');
const { adminLogin } = require('../Controllers/adminController.js');
const { createBlog, getAllBlogs, getSingleBlog} = require('../Controllers/blogController.js');
const upload = require('../middleware/multer.js');
const auth = require('../middleware/auth.js');

const {signUp, login, getUserProfile, getUserByUsername} = require('../Controllers/userController.js');
const { addComments, getBlogComments, deleteComment } = require('../Controllers/commentController.js');
const { getAllLikes, toggleLike } = require('../Controllers/likeController.js');

const router = express.Router();

router.post("/admin-login",adminLogin);

router.post("/signUp",signUp);
router.post("/login",login)
router.get("/user/me/:userId",auth,getUserProfile) //private
router.get('/user/user/:userId', getUserByUsername); //public


router.post("/create",auth,upload.single('image'),createBlog)
router.get("/get-allBlogs",getAllBlogs)
router.get("/blog/:id",getSingleBlog)

router.post("/comment/add-comment",addComments) // create comments
router.get("/comment/:blogId",getBlogComments) // get comments
router.delete("/comment/delete-comment",deleteComment)

router.post("/like/:blogId",auth,toggleLike)
router.get("/like/:blogId",getAllLikes)


module.exports = {router}; 
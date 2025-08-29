const express = require('express');
const { adminLogin } = require('../Controllers/adminController.js');
const { createBlog, getAllBlogs, getSingleBlog} = require('../Controllers/blogController.js');
const upload = require('../middleware/multer.js');
const auth = require('../middleware/auth.js');

const {signUp, login} = require('../Controllers/userController.js');
const { addComments, getBlogComments } = require('../Controllers/commentController.js');
const { likeKaro, getAllLikes, removeLike } = require('../Controllers/likeController.js');

const router = express.Router();

router.post("/admin-login",adminLogin);

router.post("/signUp",signUp);
router.post("/login",login)

router.post("/create",auth,upload.single('imageFile'),createBlog)
router.get("/get-allBlogs",getAllBlogs)
router.get("/:id",getSingleBlog)

router.post("/add-comment",addComments)
router.get("/blog/:blogId",getBlogComments)

router.post("/like/:blogId",likeKaro)
router.get("/like/:blogId",getAllLikes)
router.delete('/like/:blogId', auth, removeLike);


module.exports = {router}; 
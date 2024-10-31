const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller')
const posts = require('../controllers/posts.controller')
const userController = require('../controllers/users.controller');
const {authenticateToken} = require('../middlewares/jwt.middleware')
const { body, validationResult } = require("express-validator");

router.get('/posts', authenticateToken ,posts.list)
router.post('/posts', authenticateToken,posts.create)
router.post(
    "/users",
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Email must be valid"),
      body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
      body("bio").optional().isString(),
    ],
    userController.registerUser
  );
  router.get(
    "/users/validate/:id",
    userController.validateUser
  );
  
router.post(
"/login",
[
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().withMessage("Password is required"),
],
userController.loginUser
);
router.get('/posts/:id', authenticateToken,posts.info)
router.put('/posts/:id', authenticateToken, posts.update)
router.delete('/posts/:id', authenticateToken, posts.delete)

module.exports = router;

// router.post('/posts/:id/like', sec.auth, posts.like)
// router.post('/posts/:id/comments', sec.auth, posts.createComment)
// router.delete('/posts/:id/comments/:commentId', sec.auth, sec.commentOwner, posts.deleteComment)
// router.post('/users', upload.single('avatar'), users.create)
// router.get('/users/:id', sec.auth, users.get)
// router.patch('/users/:id', sec.auth, sec.self, upload.single('avatar'), users.update)
// router.delete('/users/:id', sec.auth, sec.self, users.delete)

// router.post('/login', users.login)
// router.post('/logout', sec.auth, users.logout)
// router.get('/authenticate/google', users.loginWithGoogle)
// router.get('/authenticate/google/cb', users.doLoginWithGoogle)


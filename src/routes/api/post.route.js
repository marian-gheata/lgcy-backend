const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');
const fileController = require('../../controllers/file.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), fileController.upload, validate(postValidation.createPost), postController.createPost)
  .get(auth(), validate(postValidation.getPosts), postController.getPosts);

router
  .route('/:postId')
  .get(auth(), validate(postValidation.getPost), postController.getPost)
  .patch(auth(), fileController.upload, validate(postValidation.updatePost), postController.updatePost)
  .delete(auth(), validate(postValidation.deletePost), postController.deletePost);

module.exports = router;

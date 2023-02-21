const httpStatus = require('http-status');
const { authService } = require('.');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (postBody, postFile, authorization) => {
  if (postFile === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please upload a file!');
  }
  const userId = await authService.getUserIdFromToken(authorization);
  const file = {
    file: {
      real: postFile.filename,
      temp: postFile.originalname,
    },
  };
  const creator = { creator: userId };

  return Post.create({ ...file, ...postBody, ...creator });
};

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
  return Post.findById(id);
};

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updateBody, updateFile) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  let file = {};
  if (updateFile !== undefined) {
    file = {
      file: {
        real: updateFile.filename,
        temp: updateFile.originalname,
      },
    };
  }
  Object.assign(post, { ...file, ...updateBody });
  await post.save();
  return post;
};

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await post.remove();
  return post;
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  deletePostById,
};

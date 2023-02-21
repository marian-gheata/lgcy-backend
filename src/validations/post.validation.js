const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  file: Joi.object().keys({
    myFile: Joi.string().required(),
  }),
  body: Joi.object().keys({
    location: Joi.string(),
    scheduleDate: Joi.string(),
    liking: Joi.boolean(),
    commenting: Joi.boolean(),
    twitter: Joi.boolean(),
    share: Joi.object().keys({
      users: Joi.string().custom(objectId),
      timelines: Joi.string().custom(objectId),
    }),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  file: Joi.object().keys({
    myFile: Joi.string().required(),
  }),
  body: Joi.object().keys({
    location: Joi.string(),
    scheduleDate: Joi.string(),
    liking: Joi.boolean(),
    commenting: Joi.boolean(),
    twitter: Joi.boolean(),
    share: Joi.object().keys({
      users: Joi.array().items(Joi.string().custom(objectId)),
      timelines: Joi.array().items(Joi.string().custom(objectId)),
    }),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};

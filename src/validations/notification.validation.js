const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNotification = Joi.object().keys({
  type: Joi.string().required(),
  from: Joi.string().custom(objectId).required(),
  to: Joi.string().custom(objectId),
  data: Joi.object()
    .keys({
      users: Joi.array().items(Joi.string().custom(objectId)),
      timelines: Joi.array().items(Joi.string().custom(objectId)),
      posts: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
});

module.exports = {
  createNotification,
};

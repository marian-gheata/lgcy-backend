const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTimeline = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.object().keys({
      value: Joi.string(),
      followerShown: Joi.boolean(),
      inviters: Joi.array().items(Joi.string().custom(objectId)),
    }),
  }),
};

const getTimelines = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTimeline = {
  params: Joi.object().keys({
    timelineId: Joi.string().custom(objectId),
  }),
};

const updateTimeline = {
  params: Joi.object().keys({
    timelineId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.object().keys({
        value: Joi.string(),
        followerShown: Joi.boolean(),
        inviters: Joi.array().items(Joi.string().custom(objectId)),
      }),
    })
    .min(1),
};

const deleteTimeline = {
  params: Joi.object().keys({
    timelineId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTimeline,
  getTimelines,
  getTimeline,
  updateTimeline,
  deleteTimeline,
};

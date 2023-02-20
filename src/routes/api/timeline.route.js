const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const timelineValidation = require('../../validations/timeline.validation');
const timelineController = require('../../controllers/timeline.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(timelineValidation.createTimeline), timelineController.createTimeline)
  .get(auth(), validate(timelineValidation.getTimelines), timelineController.getTimelines);

router
  .route('/:timelineId')
  .get(auth(), validate(timelineValidation.getTimeline), timelineController.getTimeline)
  .patch(auth(), validate(timelineValidation.updateTimeline), timelineController.updateTimeline)
  .delete(auth(), validate(timelineValidation.deleteTimeline), timelineController.deleteTimeline);

module.exports = router;

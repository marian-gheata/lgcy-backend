const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { timelineService } = require('../services');

const createTimeline = catchAsync(async (req, res) => {
  const timeline = await timelineService.createTimeline(req.body);
  res.status(httpStatus.CREATED).send(timeline);
});

const getTimelines = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await timelineService.queryTimelines(filter, options);
  res.send(result);
});

const getTimeline = catchAsync(async (req, res) => {
  const timeline = await timelineService.getTimelineById(req.params.timelineId);
  if (!timeline) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timeline not found');
  }
  res.send(timeline);
});

const updateTimeline = catchAsync(async (req, res) => {
  const timeline = await timelineService.updateTimelineById(req.params.timelineId, req.body);
  res.send(timeline);
});

const deleteTimeline = catchAsync(async (req, res) => {
  await timelineService.deleteTimelineById(req.params.timelineId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTimeline,
  getTimelines,
  getTimeline,
  updateTimeline,
  deleteTimeline,
};

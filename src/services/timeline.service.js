const httpStatus = require('http-status');
const { authService } = require('.');
const { Timeline } = require('../models');
const ApiError = require('../utils/ApiError');

const createTimeline = async (timelineBody, authorization) => {
  const userId = await authService.getUserIdFromToken(authorization);
  const creator = { creator: userId };
  return Timeline.create({ ...timelineBody, ...creator });
};

/**
 * Query for timelines
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTimelines = async (filter, options) => {
  const timelines = await Timeline.paginate(filter, options);
  return timelines;
};

/**
 * Get timeline by id
 * @param {ObjectId} id
 * @returns {Promise<Timeline>}
 */
const getTimelineById = async (id) => {
  return Timeline.findById(id);
};

/**
 * Update timeline by id
 * @param {ObjectId} timelineId
 * @param {Object} updateBody
 * @returns {Promise<Timeline>}
 */
const updateTimelineById = async (timelineId, updateBody, authorization) => {
  const userId = await authService.getUserIdFromToken(authorization);
  const creator = { creator: userId };
  const timeline = await getTimelineById(timelineId);
  if (!timeline) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timeline not found');
  }
  Object.assign(timeline, { ...updateBody, ...creator });
  await timeline.save();
  return timeline;
};

/**
 * Delete timeline by id
 * @param {ObjectId} timelineId
 * @returns {Promise<Timeline>}
 */
const deleteTimelineById = async (timelineId) => {
  const timeline = await getTimelineById(timelineId);
  if (!timeline) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timeline not found');
  }
  await timeline.remove();
  return timeline;
};

module.exports = {
  createTimeline,
  queryTimelines,
  getTimelineById,
  updateTimelineById,
  deleteTimelineById,
};

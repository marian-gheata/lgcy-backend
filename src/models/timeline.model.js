const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { status } = require('../config/status');

const timelineSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      value: {
        type: Object,
        enum: status,
        default: 'secret',
      },
      followerShown: {
        type: Boolean,
        default: false,
      },
      inviters: {
        type: Array,
        default: [],
      },
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
timelineSchema.plugin(toJSON);
timelineSchema.plugin(paginate);

/**
 * @typedef Timeline
 */
const Timeline = mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;

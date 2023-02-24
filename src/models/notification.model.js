const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { notificationTypes } = require('../config/status');

const notificationSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: notificationTypes,
      required: true,
    },
    data: {
      users: {
        type: Array,
        default: [],
      },
      timelines: {
        type: Array,
        default: [],
      },
      posts: {
        type: Array,
        default: [],
      },
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

/**
 * @typedef Notification
 */
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

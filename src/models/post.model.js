const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    file: {
      real: {
        type: String,
        required: true,
        trim: true,
      },
      temp: {
        type: String,
        required: true,
        trim: true,
      },
    },
    location: {
      type: String,
      trim: true,
    },
    scheduleDate: {
      type: String,
      trim: true,
      validate(value) {
        if (!value.match(/^(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-\d{4}$/)) {
          throw new Error('Please enter date correctly, type: mm-dd-yyyy');
        }
      },
    },
    liking: {
      type: Boolean,
      default: false,
    },
    commenting: {
      type: Boolean,
      default: false,
    },
    twitter: {
      type: Boolean,
      default: false,
    },
    share: {
      users: {
        type: Array,
        default: [],
      },
      timelines: {
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
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

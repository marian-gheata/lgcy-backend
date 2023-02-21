const util = require('util');
const multer = require('multer');
const path = require('path');
const { makeMix } = require('../services/name.service');

const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../resources/posts/uploads/'));
  },
  filename: async (req, file, cb) => {
    cb(null, (await makeMix(12)) + file.originalname);
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
}).single('myFile');

const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

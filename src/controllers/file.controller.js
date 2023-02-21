const httpStatus = require('http-status');
const path = require('path');
const uploadFile = require('../middlewares/upload');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const upload = catchAsync(async (req, res, next) => {
  try {
    await uploadFile(req, res);
    next();
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Could not upload the file: ${err}`);
  }
});

const download = catchAsync((req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.join(__dirname, '../resources/posts/uploads/');

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: `Could not download the file. ${err}`,
      });
    }
  });
});

module.exports = {
  upload,
  download,
};

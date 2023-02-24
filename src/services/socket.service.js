const httpStatus = require('http-status');
const IO = require('socket.io');
const http = require('http');
const app = require('../app');

const httpServer = http.createServer(app);
const socketIO = IO(httpServer, {
  cors: {
    origin: '*',
  },
});
const { Notification } = require('../models');
const { notificationTypes } = require('../config/status');
const socketValidate = require('../middlewares/socket.validate');
const { createNotification } = require('../validations/notification.validation');
const { getUserIdFromToken } = require('./auth.service');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service');

socketIO.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  if (token === undefined) {
    next(new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized'));
  }
  const userId = await getUserIdFromToken(`Barear ${token}`);
  const user = await getUserById(userId);
  if (!user) {
    next(new ApiError(httpStatus.NOT_FOUND, 'This user is not registered'));
  }
  Object.assign(socket, { userId: user.id, username: user.username });
  next();
});

socketIO.on('connection', (socket) => {
  logger.info('Connected to socket server', socket.id);

  socket.join(socket.userId);
  socket.on('create notification', async ({ type, data, to }) => {
    const creator = socket.userId;
    for (let i = 0; i < to.length; i += 1) {
      const notificationData = {
        type: notificationTypes[type],
        data,
        to: to[i],
        from: creator,
      };
      const notification = socketValidate(notificationData, createNotification);
      try {
        Notification.create(notification);
        // TODO:  change socketIO to soket
        socketIO.to(socket.userId).emit('send notification', notification);
      } catch (error) {
        throw new ApiError('Error: ', error);
      }
    }
  });
});

module.exports = httpServer;

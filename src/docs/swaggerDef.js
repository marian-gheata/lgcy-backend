const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'LGCY API documentation',
    version,
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api`,
    },
  ],
};

module.exports = swaggerDef;

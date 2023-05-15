import { RESPONSE_CODES } from '../../config/constants';
import Logger from './logger';
import { CommonMessages } from '../../constants/common';

const authMiddleWare = async (req, res, next) => {
  try {
    const logger = new Logger();
    await logger.init();
    const ignorePaths = [
      '/',
      '/api-docs',
      "/login",
      "/health",
    ];
    const { method, headers, originalUrl } = req;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const logObj = {
      ip,
      headers: req.headers,
      method: req.method,
      url: req.originalUrl,
      timestamp: Date.now(),
    };

    if (
      (method === 'POST' && originalUrl === '/user')
      || (method === 'GET' && originalUrl.includes('/api-docs/'))
    ) {
      logger.logInfo('Activity Log: ', logObj);
      // ignoring register URL
      return next();
    }

    const ignoreIndex = ignorePaths.findIndex((item) => item === originalUrl);
    if (ignoreIndex > -1) {
      logger.logInfo('Activity Log: ', logObj);
      return next();
    }

    if (!headers.authorization) {
      logger.logInfo('Activity Log: ', logObj);
      return res.json({
        status: 0,
        code: RESPONSE_CODES.UNAUTHORIZED,
        message: CommonMessages.UNAUTHORIZED_USER,
        data: null,
      });
    }
    return next();
  } catch (error) {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
      status: 0,
      code: RESPONSE_CODES.UNAUTHORIZED,
      message: CommonMessages.UNAUTHORIZED_USER,
      data: null,
    });
  }
};

export default authMiddleWare;

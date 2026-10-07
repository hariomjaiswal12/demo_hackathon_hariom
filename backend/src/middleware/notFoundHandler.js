import { sendError } from '../utils/response.js';

export const notFoundHandler = (req, res, next) => {
  return sendError(res, 404, `Route not found: ${req.originalUrl}`);
};

/**
 * Standardized response utility
 */
export const success = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const error = (res, message = 'Error', statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Response object with all response methods
 */
const response = {
  success,
  error,
};

export default response;


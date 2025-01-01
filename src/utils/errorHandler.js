// @desc    Function That Shows Details About The Error Only on The Development Phase
export const sendErrorDev = async (err, req, res) => //globalError
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: `${err.message}`,
    stack: err.stack
  });
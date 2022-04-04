// error handler middleware
const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
      return response.status(400).json({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({
        error: "Invalid token",
      });
    }
    next(error);
  };
  
  module.exports = errorHandler;
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// token extractor middleware
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

// extract user from auth token
const userExtractor = async (request, response, next) => {
  const token = request.token;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      request.user = null;
    }

    const user = await User.findById(decodedToken.id);
    request.user = user;
  } catch (error) {
    next(error);
  }

  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
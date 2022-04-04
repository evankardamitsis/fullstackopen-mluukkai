const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const data = request.body;

  if (!data.username || !data.password) {
    return response.status(400).json({ error: "Username/Password not found" });
  }

  if (data.password.length < 3) {
    return response.status(400).json({ error: "Password length too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(data.password, saltRounds);

  const user = new User({
    username: data.username,
    name: data.name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
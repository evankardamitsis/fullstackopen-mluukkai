const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const userExtractor = require("../utils/auth").userExtractor;

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  if (!request.body.likes) {
    request.body.likes = 0;
  }

  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }

  try {
    const user = request.user;
    if (!user) {
      return response.status(401).json({ error: "Unauthenticated request" });
    }

    request.body.user = user.id;
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = { likes: request.body.likes };
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.json(updatedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const id = request.params.id;
  try {
    const user = request.user;
    if (!user) {
      return response.status(401).json({ error: "Unauthenticated request" });
    }
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(blog.id);
      response.status(204).end();
    } else {
      response.status(403).json({ error: "Unauthorized request" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
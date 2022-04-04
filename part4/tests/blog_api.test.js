const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Testing with Jest",
    author: "Me Myself",
    url: "https://www.google.gr",
    likes: 12,
  },
  {
    title: "Testing is Cool",
    author: "Jest Industries",
    url: "https://www.google.com",
    likes: 9,
  },
];

const user = {
  name: "Evan Kardamitsis",
  username: "evan",
  password: "test",
};

beforeAll(async () => {
  await api.post("/api/users").send(user);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const user = await User.findOne({ username: "evan" });
  const blogObjects = initialBlogs.map(
    (blogItem) => new Blog({ ...blogItem, user: user.id })
  );
  const blogPromises = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(blogPromises);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct number of blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("unique identifier of blog is defined", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("create a valid blog successfully", async () => {
  const loggedInUser = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const userToken = loggedInUser.body.token;

  const blog = {
    title: "For what is worth",
    author: "Javascript Mastery",
    url: "https://www.javascriptmastery.com/",
    likes: 100,
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .set("Authorization", `Bearer ${userToken}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain(blog.title);
});

test("401 Unauthorized if token is not provided for creating a blog", async () => {
  const blog = {
    title: "Testing is cool",
    author: "Tim Robinson",
    url: "https://www.robinson.com/blog/",
  };
  await api.post("/api/blogs").send(blog).expect(401);
});

// test('blogs default likes are zero', async () => {
//   const newBlog = {
//     author: 'root other blog',
//     title: 'testtitle',
//     url: 'www.myurl.com'
//   }

//   const response = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   expect(response.body.likes).toEqual(0)
// })

test("delete a blog successfully", async () => {
  const loggedInUser = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const userToken = loggedInUser.body.token;
  const userId = loggedInUser.body.id;

  const response = await api.get("/api/blogs");
  const blog = response.body.filter(
    (r) => r.user.id.toString() === userId.toString()
  )[0];
  await api
    .delete(`/api/blogs/${blog.id}`)
    .set("Authorization", `Bearer ${userToken}`)
    .expect(204);

  const responseAfterDelete = await api.get("/api/blogs");
  expect(responseAfterDelete.body).toHaveLength(initialBlogs.length - 1);
});

test("update likes in a blog post successfully", async () => {
  const response = await api.get("/api/blogs");
  const ids = response.body.map((r) => r.id);
  const payload = { likes: 2 };
  const updatedBlog = await api
    .put(`/api/blogs/${ids[0]}`)
    .send(payload)
    .expect(200);
  expect(updatedBlog.body.likes).toBe(2);
});

afterAll(() => {
  mongoose.connection.close();
})
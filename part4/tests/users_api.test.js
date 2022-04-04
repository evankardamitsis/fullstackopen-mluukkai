const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const User = require("../models/user");
const initialUsers = [
  {
    name: "John Doe",
    username: "john",
    password: "TesT12345",
  },
  {
    name: "Mary Mayers",
    username: "mary",
    password: "testingtest",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = initialUsers.map((userItem) => new User(userItem));
  const userPromises = userObjects.map((userObject) => userObject.save());
  await Promise.all(userPromises);
});

test("list of users are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct number of users are returned", async () => {
  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(initialUsers.length);
});

describe("for a single user", () => {
  test("create a new user successfully", async () => {
    const user = {
      name: "Alex Lifeson",
      username: "alex",
      password: "passispass",
    };
    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(initialUsers.length + 1);
  });

  test("username length should be at least 3 chars", async () => {
    const user = {
      name: "Nick Cave",
      username: "nk",
      password: "badseeds",
    };
    await api.post("/api/users").send(user).expect(400);
  });

  test("password length should be at least 3 chars", async () => {
    const user = {
      name: "John Bonham",
      username: "bonzo",
      password: "12",
    };
    await api.post("/api/users").send(user).expect(400);
  });

  test("username must be unique", async () => {
    const user = {
      name: "John Bonham",
      username: "john",
      password: "12314",
    };
    await api.post("/api/users").send(user).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
})
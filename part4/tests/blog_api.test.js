const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  // Create a root user
  await User.deleteMany({})

  // Create blogs without user
  await Blog.deleteMany({})
  const noteObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Get blog information', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api
                        .get('/api/blogs')
                        .set(headers)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is about React patterns', async () => {
    const response = await api
                      .get('/api/blogs')
                      .set(headers)

    const contents = response.body.map(r => r.title)

    expect(contents).toContain('React patterns')
  })

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

describe('Adding a new blog listing', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('A valid blog can be added ', async () => {
    const newBlog = {
      title:"React Testing with Jest",
      author:"Pluralsight",
      url:"https://www.pluralsight.com/courses/testing-react-applications-jest?aid=7010a000002LUv2AAG&promo=&utm_source=non_branded&utm_medium=digital_paid_search_google&utm_campaign=XYZ_EMEA_Dynamic&utm_content=&cq_cmp=1576650371&gclid=CjwKCAjwrqqSBhBbEiwAlQeqGvazb-6VdOuZJtL7LDAPQL2K3osXl0-VmlSaxR8F0h4XpZTIAzfrexoCF1cQAvD_BwE",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'React Testing with Jest'
    )
  })

  test('If title and url are missing, respond with 400 bad request', async () => {
    const newBlog = {
      author:"Pluralsight",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('If the likes property is missing, it will default to 0 ', async () => {
    const newBlog = {
      title:"Complete Next.js with React & Node",
      author:"Filip Jerga",
      url:"https://www.udemy.com/course/awesome-nextjs-with-react-and-node-amazing-portfolio-app/?utm_source=adwords&utm_medium=udemyads&utm_campaign=WebDevelopment_v.PROF_la.EN_cc.ROWMTA-A_ti.8322&utm_content=deal4584&utm_term=_._ag_77741651163_._ad_533999949994_._kw__._de_c_._dm__._pl__._ti_aud-564043582702%3Adsa-774930032609_._li_1007565_._pd__._&matchtype=&gclid=CjwKCAjwrqqSBhBbEiwAlQeqGlhjFlIt1wbJ1diuCayOWugnsNoK77yG48Sblh1xsUTw3by4tzPcvhoCXYcQAvD_BwE",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(blog => blog.title === "Complete Next.js with React & Node")
    expect(addedBlog.likes).toBe(0)
  })
})

describe('Update a blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('Successful blog update', async () => {

    const newBlog = {
      title:"A history of Rush",
      author:"Alex Lifeson",
      url:"https://www.rush.com/",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const foundBlog = blogsAtEnd.find(blog => blog.likes === 13)
    expect(foundBlog.likes).toBe(13)
  })
})

describe('Deleting a blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title:"Test Blog",
      author:"Nick Cave",
      url:"http://www.google.com/",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
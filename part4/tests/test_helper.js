const Blog = require('../models/Blog')
const User = require('../models/User')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./')

const initialBlogs = [
  {
    title: 'Twitter',
    author: 'Jack Dorsey',
    url: 'www.twitter.com',
    likes: 100
  },
  {
    title: 'Portfolio',
    author: 'Halit Aydin',
    url: 'www.halit.io',
    likes: 1000
  },
  {
    title: 'Port',
    author: 'Halit',
    url: 'www.test.io',
    likes: 1000
  }
]

const initialUsers = [
  {
    username: 'Obi-Wan',
    password: 'secret'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    author: 'willremovethissoon',
    title: 'zzz',
    url: 'www.halit.io'
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const firstUserId = async () => {
  const users = await usersInDb()
  return users[0].id
}

const firstUserToken = async () => {
  const user = {
    username: initialUsers[0].username,
    password: initialUsers[0].password
  }
  return (await api
    .post('/api/login')
    .send(user)).body.token
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId ,blogsInDb, usersInDb, firstUserId, firstUserToken
}
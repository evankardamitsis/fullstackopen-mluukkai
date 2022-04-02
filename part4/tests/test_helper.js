const Blog = require('../models/Blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Alkaidcc',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    likes: 3
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'Vue.js in Action',
    author: 'Alkaidcc',
    url: 'https://www.baidu.com/',
    likes: 10
  })
  await blog.save()
  await blog.remove()
  
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}
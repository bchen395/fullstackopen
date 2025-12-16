const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Ellie's World",
    author: "Ellie Williams",
    url: "4000",
    likes: 100000
  },
  {
    title: "BCBCBC",
    author: "Benson Chen",
    url: "123",
    likes: 100
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
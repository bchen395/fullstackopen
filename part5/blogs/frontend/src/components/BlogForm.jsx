import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newURL, setURL] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0,
    })
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
          title:
            <input value={newTitle} onChange={event => setTitle(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
          author:
            <input value={newAuthor} onChange={event => setAuthor(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
          url:
            <input value={newURL} onChange={event => setURL(event.target.value)} />
          </label>
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
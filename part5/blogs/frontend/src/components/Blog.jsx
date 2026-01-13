import { useState } from 'react'
const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  return (
    <div>
      <div className="blog-summary" data-testid="blog-summary" style={{ ...blogStyle, ...hideWhenVisible }}>
          {blog.title} {blog.author}
          <button onClick={() => setDetailsVisible(true)}>view</button>
      </div>
      <div className="blog-details" data-testid="blog-details"style={{ ...blogStyle, ...showWhenVisible }}>
          {blog.title} {blog.author}
          <button onClick={() => setDetailsVisible(false)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={() => updateLikes(blog.id)}>like</button>
          <br />
          {blog.user.username}
          <br />
          {user && blog.user.username === user.username && (
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          )}
      </div>
    </div>
  )
}

export default Blog
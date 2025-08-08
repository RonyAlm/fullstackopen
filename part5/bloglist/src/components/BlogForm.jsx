import { useState, useRef } from 'react'
import Togglable from './Togglable'


const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const blogFormRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(
      {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })
    setNewBlog({ title: '', author: '', url: '' })
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={addBlog} aria-label='Form to add a new blog'>
        <h3>Add a new blog</h3>
        <div>
          <input type="text"
            role='textbox'
            placeholder="title"
            name="title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
        </div>
        <div>
          <input type="text"
            role='textbox'
            placeholder="author"
            name="author"
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} />
        </div>
        <div>
          <input type="text"
            role='textbox'
            placeholder="url"
            name="url"
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })} />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
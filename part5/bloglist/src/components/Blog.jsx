import { useState } from 'react'
const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const { id, title, author, url, likes, user: blogUser } = blog


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5
  }

  const headerStyle = {
    display: 'flex',
    gap: 20,
    alignItems: 'center'
  }

  const toogleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    updateBlog(id, { ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      removeBlog(id)
    }
  }

  return (
    <section style={blogStyle}>
      <div style={headerStyle}>
        <p>{title}</p>
        <small>{author}</small>
        <button onClick={toogleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div className="details" style={{ display: visible ? '' : 'none' }}>
        <a href={url}>{url}</a>

        <p>Likes: {likes}</p>
        <button onClick={increaseLikes}>Like</button>

        <p>{blogUser.username}</p>
        {
          user && user.name === blogUser.name &&
          <button onClick={handleRemove}>remove</button>
        }
      </div>
    </section>
  )
}
export default Blog
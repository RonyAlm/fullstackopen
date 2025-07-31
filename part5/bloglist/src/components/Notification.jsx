import React from 'react'

const Notification = ({ message, type }) => {
  return (
    <div className="notification" style={{ color: type === 'error' ? 'red' : 'green' }}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
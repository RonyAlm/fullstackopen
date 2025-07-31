import Togglable from './Togglable'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <Togglable buttonLabel="Log in">
      <form onSubmit={handleLogin}>
        <h3>Login in to application</h3>
        <div>
          <input type="text"
            name="Username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange} />
        </div>
        <div>
          <input type="password"
            name="Password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm
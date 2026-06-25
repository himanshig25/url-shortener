import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        const res = await axios.post('https://url-shortener-backend-z6tu.onrender.com/api/auth/login', {
          email,
          password
        })
        login(res.data.token, res.data.user)
        navigate('/')
      } else {
        await axios.post('https://url-shortener-backend-z6tu.onrender.com/api/auth/register', {
          name,
          email,
          password
        })
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!')
    }
  }

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="FullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="EmailAdress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className="toggle">
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </p>
    </div>
  )
}

export default Login
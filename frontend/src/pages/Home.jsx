import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './Home.css'

function Home() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleShorten = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(
        'https://url-shortener-backend-z6tu.onrender.com/api/url/shorten',
        { originalUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setShortUrl(res.data.shortUrl)
    } catch (err) {
      setError(err.response?.data?.message || 'Kuch gadbad ho gayi!')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>URL Shortener</h1>
        <div>
          <button onClick={() => navigate('/dashboard')} className="nav-btn">Dashboard</button>
          <button onClick={handleLogout} className="nav-btn logout">Logout</button>
        </div>
      </nav>

      <div className="shorten-box">
        <h2>Apna link chhota karo!</h2>
        <form onSubmit={handleShorten}>
          <input
            type="url"
            placeholder="https://example.com/bahut/lamba/link"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Ban raha hai...' : 'Chhota karo!'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="result">
            <p>Tera short link:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
            <button onClick={() => navigator.clipboard.writeText(shortUrl)} className="copy-btn">
              Copy karo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
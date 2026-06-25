import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

function Dashboard() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)

  const { token, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = async () => {
    try {
      const res = await axios.get(
        'https://url-shortener-backend-z6tu.onrender.com/api/url/analytics',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setUrls(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading..</p>

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Dashboard</h1>
        <div>
          <button onClick={() => navigate('/')} className="nav-btn">Home</button>
          <button onClick={handleLogout} className="nav-btn logout">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h2>Your links</h2>
        {urls.length === 0 ? (
          <p className="no-urls">No link yet — Go to Home and create one!</p>
        ) : (
          <div className="urls-grid">
            {urls.map((url) => (
              <div key={url._id} className="url-card">
                <div className="url-info">
                  <a href={url.originalUrl} target="_blank" rel="noreferrer" className="original-url">
                    {url.originalUrl.length > 50 ? url.originalUrl.substring(0, 50) + '...' : url.originalUrl}
                  </a>
                  <a href={`https://url-shortener-backend-z6tu.onrender.com/${url.shortCode}`} target="_blank" rel="noreferrer" className="short-url">
                   url-shortener-backend-z6tu.onrender.com/{url.shortCode}
                  </a>
                </div>
                <div className="url-stats">
                  <span className="clicks">{url.clicks} clicks</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(`https://url-shortener-backend-z6tu.onrender.com/${url.shortCode}`)}
                    className="copy-btn"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
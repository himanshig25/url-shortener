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
        'http://localhost:5000/api/url/analytics',
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

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Load ho raha hai...</p>

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
        <h2>Tere saare links</h2>
        {urls.length === 0 ? (
          <p className="no-urls">Abhi koi link nahi banaya — Home pe jao aur banao!</p>
        ) : (
          <div className="urls-grid">
            {urls.map((url) => (
              <div key={url._id} className="url-card">
                <div className="url-info">
                  <a href={url.originalUrl} target="_blank" rel="noreferrer" className="original-url">
                    {url.originalUrl.length > 50 ? url.originalUrl.substring(0, 50) + '...' : url.originalUrl}
                  </a>
                  <a href={`http://localhost:5000/${url.shortCode}`} target="_blank" rel="noreferrer" className="short-url">
                    localhost:5000/{url.shortCode}
                  </a>
                </div>
                <div className="url-stats">
                  <span className="clicks">{url.clicks} clicks</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(`http://localhost:5000/${url.shortCode}`)}
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
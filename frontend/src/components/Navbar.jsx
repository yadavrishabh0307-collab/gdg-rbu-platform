import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import GdgLogo from './GdgLogo'
import { LogOut, LayoutDashboard, Settings, BarChart2, Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  const close = () => setMenuOpen(false)

  const scrollToSection = (id) => {
    close()
    if (location.pathname !== '/') {
      navigate('/#' + id)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={close}>
          <GdgLogo size={34} />
        </Link>

        {/* Mobile toggle */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Navigation Pills (Figma Neo-brutalist style) */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <div className="nav-pills-group">
            <Link to="/" className="nav-pill pill-blue" onClick={close}>
              Home
            </Link>
            <Link to="/events" className="nav-pill pill-red" onClick={close}>
              Events
            </Link>
            <button className="nav-pill pill-yellow" onClick={() => scrollToSection('team')}>
              Team
            </button>
            <Link to="/about" className="nav-pill pill-green" onClick={close}>
              About
            </Link>
            <button className="nav-pill pill-cyan" onClick={() => scrollToSection('faqs')}>
              FAQs
            </button>
          </div>

          {/* User / Admin Extra Links */}
          <div className="nav-user-group">
            {user && (
              <Link to="/dashboard" className="nav-pill pill-purple" onClick={close}>
                <LayoutDashboard size={14} /> My Events
              </Link>
            )}
            {isAdmin && (
              <>
                <Link to="/admin" className="nav-pill pill-dark" onClick={close}>
                  <Settings size={14} /> Admin
                </Link>
                <Link to="/analytics" className="nav-pill pill-dark" onClick={close}>
                  <BarChart2 size={14} /> Analytics
                </Link>
              </>
            )}

            {/* Dark/Light Theme Switcher */}
            <button
              className="theme-toggle-btn"
              onClick={toggle}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="nav-user-profile">
                <span className="user-avatar-badge">{user.name?.[0]?.toUpperCase() || 'U'}</span>
                <span className="user-name-text">{user.name?.split(' ')[0]}</span>
                <button className="btn-logout-pill" onClick={handleLogout} title="Logout">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div className="nav-auth-buttons">
                <Link to="/login" className="btn-auth-pill btn-auth-login" onClick={close}>
                  Login
                </Link>
                <Link to="/register" className="btn-auth-pill btn-auth-signup" onClick={close}>
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

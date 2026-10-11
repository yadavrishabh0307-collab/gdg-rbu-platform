import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingSideLogo from './components/FloatingSideLogo'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Analytics from './pages/Analytics'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
              <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
              <Route path="*" element={
                <div className="not-found">
                  <h1>404</h1>
                  <p>Page not found</p>
                  <a href="/">Go Home</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
          <FloatingSideLogo />
          <Toaster position="top-right" toastOptions={{ style: { background: 'var(--card-bg)', color: 'var(--text-primary)', border: '2px solid var(--border)' } }} />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

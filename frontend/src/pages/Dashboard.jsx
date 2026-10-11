import { useEffect, useState } from 'react'
import { registrationsAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { Calendar, MapPin, QrCode, XCircle } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedQR, setSelectedQR] = useState(null)

  useEffect(() => {
    registrationsAPI.myEvents()
      .then(r => setRegistrations(r.data))
      .catch(() => toast.error('Failed to load your events'))
      .finally(() => setLoading(false))
  }, [])

  const handleUnregister = async (eventId) => {
    try {
      await registrationsAPI.unregister(eventId)
      setRegistrations(prev => prev.filter(r => r.event.id !== eventId))
      toast.success('Unregistered successfully')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed')
    }
  }

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>My Events</h1>
        <p>Welcome back, <strong>{user.name}</strong> — {registrations.length} registration{registrations.length !== 1 ? 's' : ''}</p>
      </div>

      {registrations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No registrations yet</h3>
          <p>Browse events and register for ones you like!</p>
          <a href="/events" className="btn-primary-sm">Browse Events</a>
        </div>
      ) : (
        <div className="dashboard-grid">
          {registrations.map(r => {
            const date = new Date(r.event.date_time)
            const isPast = date < new Date()
            return (
              <div key={r.registration_id} className={`dashboard-card ${isPast ? 'past' : ''}`}>
                <div className="dc-header">
                  <span className="dc-category">{r.event.category}</span>
                  {isPast && <span className="badge-past">Past</span>}
                </div>
                <h3 className="dc-title">{r.event.title}</h3>
                <div className="dc-meta">
                  <span><Calendar size={14} /> {date.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                  <span><MapPin size={14} /> {r.event.venue.split(',')[0]}</span>
                </div>
                <div className="dc-actions">
                  <button className="btn-qr" onClick={() => setSelectedQR(r.qr_code)}>
                    <QrCode size={15} /> View QR Code
                  </button>
                  {!isPast && (
                    <button className="btn-unreg" onClick={() => handleUnregister(r.event.id)}>
                      <XCircle size={15} /> Unregister
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* QR Modal */}
      {selectedQR && (
        <div className="modal-overlay" onClick={() => setSelectedQR(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3>Your Check-in QR Code</h3>
            <img src={`data:image/png;base64,${selectedQR}`} alt="QR Code" className="qr-image" />
            <p className="qr-hint">Show this at the event entrance</p>
            <button className="btn-close-modal" onClick={() => setSelectedQR(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

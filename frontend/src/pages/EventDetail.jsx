import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { eventsAPI, registrationsAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { Calendar, MapPin, Users, Tag, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [event, setEvent] = useState(null)
  const [myEvents, setMyEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    Promise.all([
      eventsAPI.get(id),
      user ? registrationsAPI.myEvents() : Promise.resolve({ data: [] }),
    ]).then(([ev, my]) => {
      setEvent(ev.data)
      setMyEvents(my.data.map(r => r.event.id))
    }).catch(() => navigate('/events'))
      .finally(() => setLoading(false))
  }, [id, user])

  const isRegistered = myEvents.includes(Number(id))

  const handleRegister = async () => {
    if (!user) return navigate('/login')
    setActionLoading(true)
    try {
      await registrationsAPI.register(id)
      toast.success('Registered! Check your email for confirmation.')
      setMyEvents(prev => [...prev, Number(id)])
      setEvent(prev => ({ ...prev, registered_count: prev.registered_count + 1 }))
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setActionLoading(false)
    }
  }

  const handleUnregister = async () => {
    setActionLoading(true)
    try {
      await registrationsAPI.unregister(id)
      toast.success('Unregistered successfully')
      setMyEvents(prev => prev.filter(i => i !== Number(id)))
      setEvent(prev => ({ ...prev, registered_count: prev.registered_count - 1 }))
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to unregister')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>
  if (!event) return null

  const date = new Date(event.date_time)
  const isPast = date < new Date()
  const fillPct = Math.round((event.registered_count / event.capacity) * 100)

  return (
    <div className="event-detail">
      <button className="back-btn" onClick={() => navigate('/events')}>
        <ArrowLeft size={18} /> Back to Events
      </button>

      <div className="detail-hero">
        <div className="detail-category-badge">{event.category}</div>
        <h1>{event.title}</h1>
        <div className="detail-meta">
          <span><Calendar size={16} /> {date.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })} at {date.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</span>
          <span><MapPin size={16} /> {event.venue}</span>
          <span><Users size={16} /> {event.registered_count} / {event.capacity} registered</span>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-main">
          <div className="detail-section">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </div>
          <div className="detail-section">
            <h2>Capacity</h2>
            <div className="capacity-bar large">
              <div className="capacity-info">
                <span>{event.registered_count} registered</span>
                <span>{event.capacity - event.registered_count} spots left</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${fillPct}%`, background: fillPct > 80 ? '#ea4335' : '#4285f4' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="register-card">
            <div className="register-info">
              <div className="register-date">
                <span className="rd-day">{date.getDate()}</span>
                <span className="rd-month">{date.toLocaleString('default', { month:'short' })}</span>
              </div>
              <div>
                <p className="rd-time">{date.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</p>
                <p className="rd-venue">{event.venue.split(',')[0]}</p>
              </div>
            </div>

            {isPast ? (
              <div className="badge-past-large">This event has ended</div>
            ) : event.is_full && !isRegistered ? (
              <div className="badge-full-large">Event is Full</div>
            ) : isRegistered ? (
              <div className="registered-state">
                <div className="registered-badge"><CheckCircle size={18} /> You're Registered!</div>
                <button className="btn-unregister" onClick={handleUnregister} disabled={actionLoading}>
                  {actionLoading ? <span className="spinner-sm" /> : <><XCircle size={16}/> Unregister</>}
                </button>
              </div>
            ) : (
              <button className="btn-register" onClick={handleRegister} disabled={actionLoading}>
                {actionLoading ? <span className="spinner-sm" /> : 'Register Now →'}
              </button>
            )}

            {!user && !isPast && (
              <p className="login-prompt">
                <a href="/login">Log in</a> to register for this event
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

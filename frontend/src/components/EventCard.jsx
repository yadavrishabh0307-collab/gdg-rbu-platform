import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Tag } from 'lucide-react'

const CATEGORY_COLORS = {
  Workshop: '#4285f4',
  Bootcamp: '#34a853',
  'Tech Talk': '#fbbc04',
  Festival: '#ea4335',
  Other: '#9b59b6',
}

export default function EventCard({ event }) {
  const date = new Date(event.date_time)
  const isPast = date < new Date()
  const fillPercent = Math.round((event.registered_count / event.capacity) * 100)
  const color = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.Other

  return (
    <div className={`event-card ${isPast ? 'past' : ''}`}>
      <div className="card-header" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
        <span className="category-badge" style={{ background: color }}>{event.category}</span>
        {event.is_full && <span className="full-badge">FULL</span>}
        {isPast && <span className="past-badge">PAST</span>}
        <div className="card-date">
          <div className="date-day">{date.getDate()}</div>
          <div className="date-month">{date.toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <p className="card-desc">{event.description.slice(0, 100)}...</p>
        <div className="card-meta">
          <span><MapPin size={13} /> {event.venue.split(',')[0]}</span>
          <span><Calendar size={13} /> {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="capacity-bar">
          <div className="capacity-info">
            <span><Users size={13} /> {event.registered_count}/{event.capacity}</span>
            <span>{fillPercent}% full</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${fillPercent}%`, background: fillPercent > 80 ? '#ea4335' : color }} />
          </div>
        </div>
        <Link to={`/events/${event.id}`} className="btn-card">View Details →</Link>
      </div>
    </div>
  )
}

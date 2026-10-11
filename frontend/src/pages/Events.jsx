import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { eventsAPI } from '../services/api'
import EventCard from '../components/EventCard'
import { Search, Filter, X } from 'lucide-react'

const CATEGORIES = ['Workshop', 'Bootcamp', 'Tech Talk', 'Festival', 'Other']

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState('')
  const [upcoming, setUpcoming] = useState(false)

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (category) params.category = category
      if (upcoming) params.upcoming = true
      const res = await eventsAPI.list(params)
      setEvents(res.data)
    } catch {
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEvents() }, [search, category, upcoming])

  const clearFilters = () => { setSearch(''); setCategory(''); setUpcoming(false) }
  const hasFilters = search || category || upcoming

  return (
    <div className="events-page">
      <div className="page-header">
        <h1>All Events</h1>
        <p>{events.length} event{events.length !== 1 ? 's' : ''} found</p>
      </div>

      {/* Search & Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={17} />
          <input placeholder="Search events..." value={search}
            onChange={e => setSearch(e.target.value)} />
          {search && <button onClick={() => setSearch('')}><X size={14} /></button>}
        </div>
        <div className="filter-group">
          <Filter size={16} />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <label className="toggle-filter">
          <input type="checkbox" checked={upcoming} onChange={e => setUpcoming(e.target.checked)} />
          <span>Upcoming only</span>
        </label>
        {hasFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="loading-grid">
          {[1,2,3,4,5,6].map(i => <div key={i} className="card-skeleton" />)}
        </div>
      ) : events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No events found</h3>
          <p>Try adjusting your search or filters</p>
          {hasFilters && <button className="btn-outline" onClick={clearFilters}>Clear Filters</button>}
        </div>
      ) : (
        <div className="events-grid">
          {events.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { eventsAPI, registrationsAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, Users, X, Check } from 'lucide-react'

const EMPTY_FORM = { title: '', description: '', date_time: '', venue: '', capacity: 1, category: 'Workshop', image_url: '' }
const CATEGORIES = ['Workshop', 'Bootcamp', 'Tech Talk', 'Festival', 'Other']

export default function AdminPanel() {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [attendeesModal, setAttendeesModal] = useState(null)
  const [attendees, setAttendees] = useState([])

  const fetchEvents = () =>
    eventsAPI.list({}).then(r => setEvents(r.data)).catch(() => toast.error('Failed to load events'))

  useEffect(() => { fetchEvents() }, [])

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true) }
  const openEdit = (ev) => {
    const dt = new Date(ev.date_time)
    const localDT = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    setForm({ title: ev.title, description: ev.description, date_time: localDT, venue: ev.venue, capacity: ev.capacity, category: ev.category, image_url: ev.image_url || '' })
    setEditId(ev.id)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, date_time: new Date(form.date_time).toISOString() }
      if (editId) {
        await eventsAPI.update(editId, payload)
        toast.success('Event updated!')
      } else {
        await eventsAPI.create(payload)
        toast.success('Event created!')
      }
      setShowForm(false)
      fetchEvents()
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return
    try {
      await eventsAPI.delete(id)
      toast.success('Event deleted')
      fetchEvents()
    } catch { toast.error('Failed to delete') }
  }

  const viewAttendees = async (ev) => {
    setAttendeesModal(ev)
    try {
      const res = await registrationsAPI.attendees(ev.id)
      setAttendees(res.data)
    } catch { setAttendees([]) }
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Admin Panel</h1>
          <p>Manage all events</p>
        </div>
        <button className="btn-primary-sm" onClick={openCreate}><Plus size={16} /> New Event</button>
      </div>

      {/* Events Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Event</th><th>Date</th><th>Category</th><th>Capacity</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {events.map(ev => (
              <tr key={ev.id}>
                <td><div className="td-title">{ev.title}</div><div className="td-venue">{ev.venue.split(',')[0]}</div></td>
                <td>{new Date(ev.date_time).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</td>
                <td><span className="cat-pill">{ev.category}</span></td>
                <td><span className={ev.is_full ? 'cap-full' : 'cap-ok'}>{ev.registered_count}/{ev.capacity}</span></td>
                <td className="action-btns">
                  <button title="Attendees" onClick={() => viewAttendees(ev)}><Users size={15} /></button>
                  <button title="Edit" onClick={() => openEdit(ev)}><Pencil size={15} /></button>
                  <button title="Delete" className="del-btn" onClick={() => handleDelete(ev.id)}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? 'Edit Event' : 'Create New Event'}</h3>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="event-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date & Time</label>
                  <input type="datetime-local" value={form.date_time} onChange={e => setForm({...form, date_time: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="number" min={1} value={form.capacity} onChange={e => setForm({...form, capacity: Number(e.target.value)})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Image URL (optional)</label>
                <input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? <span className="spinner-sm" /> : <><Check size={16} /> {editId ? 'Update' : 'Create'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendees Modal */}
      {attendeesModal && (
        <div className="modal-overlay" onClick={() => setAttendeesModal(null)}>
          <div className="modal-box large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Attendees — {attendeesModal.title}</h3>
              <button onClick={() => setAttendeesModal(null)}><X size={18} /></button>
            </div>
            {attendees.length === 0 ? (
              <p className="empty-msg">No registrations yet</p>
            ) : (
              <table className="admin-table">
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Registered At</th></tr></thead>
                <tbody>
                  {attendees.map((a, i) => (
                    <tr key={a.user_id}>
                      <td>{i + 1}</td>
                      <td>{a.name}</td>
                      <td>{a.email}</td>
                      <td>{new Date(a.registered_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

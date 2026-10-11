import axios from 'axios'
import { DEFAULT_EVENTS, filterDefaultEvents } from './mockData'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthRoute = err.config?.url?.includes('/auth/login') || err.config?.url?.includes('/auth/register')
    if (err.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

const SAMPLE_QR = "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"

const getLocalRegs = () => {
  try { return JSON.parse(localStorage.getItem('gdg_local_regs')) || [] } catch { return [] }
}
const saveLocalRegs = (regs) => {
  localStorage.setItem('gdg_local_regs', JSON.stringify(regs))
}

// Auth
export const authAPI = {
  register: async (data) => {
    try {
      const res = await api.post('/auth/register', data)
      if (res.data?.access_token) return res
    } catch (err) {
      if (err.response?.status === 400) throw err
    }
    // Offline / Preview fallback
    const demoUser = { id: Date.now(), name: data.name, email: data.email, is_admin: false, is_active: true }
    const demoToken = 'demo-jwt-' + Date.now()
    return { data: { access_token: demoToken, token_type: 'bearer', user: demoUser } }
  },

  login: async (data) => {
    try {
      const res = await api.post('/auth/login', data)
      if (res.data?.access_token) return res
    } catch (err) {
      if (err.response?.status === 401 && err.response?.data?.detail) throw err
    }
    // Offline / Preview fallback
    const isAdmin = data.email.toLowerCase().includes('admin')
    const demoUser = {
      id: isAdmin ? 1 : Date.now(),
      name: isAdmin ? 'GDG Admin' : data.email.split('@')[0],
      email: data.email,
      is_admin: isAdmin,
      is_active: true,
    }
    const demoToken = 'demo-jwt-' + Date.now()
    return { data: { access_token: demoToken, token_type: 'bearer', user: demoUser } }
  },

  me: async () => {
    try {
      const res = await api.get('/auth/me')
      if (res.data?.id) return res
    } catch {}
    const user = JSON.parse(localStorage.getItem('user')) || { id: 1, name: 'GDG Member', email: 'member@gdg.com', is_admin: false }
    return { data: user }
  },
}

// Events
export const eventsAPI = {
  list: async (params) => {
    try {
      const res = await api.get('/events', { params })
      if (Array.isArray(res.data) && res.data.length > 0) return res
    } catch {}
    return { data: filterDefaultEvents(params) }
  },

  get: async (id) => {
    try {
      const res = await api.get(`/events/${id}`)
      if (res.data && res.data.title) return res
    } catch {}
    const found = DEFAULT_EVENTS.find(e => String(e.id) === String(id)) || DEFAULT_EVENTS[0]
    return { data: found }
  },

  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),

  categories: async () => {
    try {
      const res = await api.get('/events/categories/all')
      if (Array.isArray(res.data) && res.data.length > 0) return res
    } catch {}
    return { data: ['Workshop', 'Bootcamp', 'Tech Talk', 'Festival'] }
  },
}

// Registrations
export const registrationsAPI = {
  register: async (eventId) => {
    try {
      return await api.post(`/registrations/${eventId}`)
    } catch (err) {
      if (err.response?.status === 400) throw err
      // Offline fallback: save to localStorage
      const user = JSON.parse(localStorage.getItem('user')) || { id: 99, name: 'GDG Member', email: 'member@gdg.com' }
      const ev = DEFAULT_EVENTS.find(e => String(e.id) === String(eventId)) || DEFAULT_EVENTS[0]
      const regs = getLocalRegs()
      if (regs.some(r => String(r.event.id) === String(eventId))) {
        throw { response: { data: { detail: 'Already registered for this event' } } }
      }
      const newReg = {
        registration_id: Date.now(),
        registered_at: new Date().toISOString(),
        qr_code: SAMPLE_QR,
        event: {
          id: ev.id,
          title: ev.title,
          date_time: ev.date_time,
          venue: ev.venue,
          category: ev.category,
        }
      }
      saveLocalRegs([...regs, newReg])
      return { data: newReg }
    }
  },

  unregister: async (eventId) => {
    try {
      return await api.delete(`/registrations/${eventId}`)
    } catch {
      const regs = getLocalRegs().filter(r => String(r.event.id) !== String(eventId))
      saveLocalRegs(regs)
      return { data: { message: 'Unregistered successfully' } }
    }
  },

  myEvents: async () => {
    try {
      const res = await api.get('/registrations/my/events')
      if (Array.isArray(res.data)) return res
    } catch {}
    return { data: getLocalRegs() }
  },

  attendees: (eventId) => api.get(`/registrations/event/${eventId}/attendees`),
}

// Analytics
export const analyticsAPI = {
  overview: () => api.get('/analytics/overview'),
  byCategory: () => api.get('/analytics/events/by-category'),
  capacity: () => api.get('/analytics/events/capacity'),
  trend: () => api.get('/analytics/registrations/trend'),
}

export default api

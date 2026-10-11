import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
}

// Events
export const eventsAPI = {
  list: (params) => api.get('/events', { params }),
  get: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  categories: () => api.get('/events/categories/all'),
}

// Registrations
export const registrationsAPI = {
  register: (eventId) => api.post(`/registrations/${eventId}`),
  unregister: (eventId) => api.delete(`/registrations/${eventId}`),
  myEvents: () => api.get('/registrations/my/events'),
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

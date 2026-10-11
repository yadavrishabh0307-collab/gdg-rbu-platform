import { useEffect, useState } from 'react'
import { analyticsAPI } from '../services/api'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts'
import { Users, Calendar, Ticket, TrendingUp } from 'lucide-react'

const COLORS = ['#4285f4', '#34a853', '#fbbc04', '#ea4335', '#9b59b6', '#1abc9c']

export default function Analytics() {
  const [overview, setOverview] = useState(null)
  const [byCategory, setByCategory] = useState([])
  const [capacity, setCapacity] = useState([])
  const [trend, setTrend] = useState([])

  useEffect(() => {
    analyticsAPI.overview().then(r => setOverview(r.data)).catch(() => {})
    analyticsAPI.byCategory().then(r => setByCategory(r.data)).catch(() => {})
    analyticsAPI.capacity().then(r => setCapacity(r.data)).catch(() => {})
    analyticsAPI.trend().then(r => setTrend(r.data)).catch(() => {})
  }, [])

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <p>Real-time insights across all events</p>
      </div>

      {/* Overview Cards */}
      {overview && (
        <div className="overview-grid">
          {[
            { label: 'Total Events', value: overview.total_events, icon: <Calendar size={22} />, color: '#4285f4' },
            { label: 'Total Users', value: overview.total_users, icon: <Users size={22} />, color: '#34a853' },
            { label: 'Registrations', value: overview.total_registrations, icon: <Ticket size={22} />, color: '#fbbc04' },
            { label: 'Upcoming Events', value: overview.upcoming_events, icon: <TrendingUp size={22} />, color: '#ea4335' },
          ].map(card => (
            <div key={card.label} className="overview-card" style={{ borderTop: `3px solid ${card.color}` }}>
              <div className="ov-icon" style={{ color: card.color }}>{card.icon}</div>
              <div className="ov-value">{card.value}</div>
              <div className="ov-label">{card.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="charts-grid">
        {/* Capacity Chart */}
        <div className="chart-card wide">
          <h3>Registrations vs Capacity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={capacity} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis dataKey="title" tick={{ fill: '#aaa', fontSize: 11 }} angle={-25} textAnchor="end" interval={0} />
              <YAxis tick={{ fill: '#aaa', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: 8 }} labelStyle={{ color: '#fff' }} />
              <Legend wrapperStyle={{ color: '#aaa' }} />
              <Bar dataKey="capacity" name="Capacity" fill="#4285f422" stroke="#4285f4" radius={[4,4,0,0]} />
              <Bar dataKey="registered" name="Registered" fill="#4285f4" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <h3>Events by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={byCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={90} label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: 8 }} />
              <Legend wrapperStyle={{ color: '#aaa', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Chart */}
        <div className="chart-card wide">
          <h3>Registration Trend</h3>
          {trend.length === 0 ? (
            <p className="empty-msg">No registration data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                <XAxis dataKey="date" tick={{ fill: '#aaa', fontSize: 11 }} />
                <YAxis tick={{ fill: '#aaa', fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: 8 }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="count" name="Registrations" stroke="#34a853" strokeWidth={2} dot={{ fill: '#34a853', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}

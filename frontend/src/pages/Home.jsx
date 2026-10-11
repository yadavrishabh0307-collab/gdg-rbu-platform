import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { eventsAPI } from '../services/api'
import { ChevronDown, Calendar, MapPin, Clock, ArrowRight, Search, X, Loader2 } from 'lucide-react'
import teamPhoto from '../assets/team_rbu_members_2026.jpg'

export default function Home() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [expandedFaq, setExpandedFaq] = useState(0) // First FAQ is open by default exactly as in Figma

  // Search Bar State
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchContainerRef = useRef(null)

  useEffect(() => {
    eventsAPI.list({ upcoming: true })
      .then(r => setEvents(r.data))
      .catch(() => {})
  }, [])

  // Live search debounced
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timeoutId = setTimeout(() => {
      eventsAPI.list({ search: searchQuery.trim() })
        .then(res => {
          setSearchResults(res.data)
          setIsSearching(false)
        })
        .catch(() => {
          setSearchResults([])
          setIsSearching(false)
        })
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setShowDropdown(false)
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/events')
    }
  }

  const faqs = [
    {
      q: "What is GDG RBU?",
      a: "GDG RBU is focused on empowering students through hands-on workshops, hackathons, and real-world project collaboration."
    },
    {
      q: "How to join GDG?",
      a: "Students can register on this portal, join our official WhatsApp and Discord community groups, and attend our upcoming orientation session!"
    },
    {
      q: "What does a GDG Lead do?",
      a: "GDG Leads coordinate tech workshops, organize study jams and hackathons, bridge students with Google developer resources, and mentor peers."
    },
    {
      q: "How is GDG related to Google?",
      a: "GDG (Google Developer Groups) is a global student program supported by Google Developers to support student developers around the world."
    },
    {
      q: "How to reach us?",
      a: "You can reach out directly to Rohit Agrawal (Web Lead) at +91 9981978217 or email us at gdg@rknec.edu."
    }
  ]

  const firstEvent = events[0] || {
    id: 1,
    title: "GDG ORIENTATION",
    description: "Welcome to Google Developer Groups RBU! Discover upcoming workshops, hackathons, open source cohorts, and how to get selected for core team roles.",
    date_time: "2026-10-15T10:00:00",
    venue: "Main Auditorium, RBU Campus"
  }

  const secondEvent = events[1] || {
    id: 2,
    title: "Cloud Study Jam & GenAI Workshop",
    description: "Hands-on cloud architecture and Gemini API integration session with certificates and swag.",
    date_time: "2026-10-22T14:00:00",
    venue: "Computer Center Lab 3"
  }

  return (
    <div className="figma-container">
      {/* =========================================================
          1. HERO SECTION (Exact Figma Match + Working Search Bar)
          ========================================================= */}
      <section className="figma-hero-section">
        <div className="figma-hero-grid">
          {/* Left: Pixel Headline, Subtitle, Brutalist Buttons */}
          <div className="figma-hero-content">
            <h1 className="figma-pixel-title">
              GOOGLE DEVELOPER<br />
              GROUPS, RBU
            </h1>
            <p className="figma-hero-sub">
              EMPOWERING STUDENTS WITH<br />
              CUTTING-EDGE TECH SKILLS,<br />
              COMMUNITY, AND INNOVATION<br />
              FOR A FUTURE IN<br />
              TECHNOLOGY
            </p>
            <div className="figma-hero-buttons">
              <Link to="/events" className="figma-btn-brutalist">
                EXPLORE EVENTS
              </Link>
              <Link to="/register" className="figma-btn-brutalist">
                JOIN US
              </Link>
            </div>
          </div>

          {/* Right: Functional Neo-brutalist Search Widget (Figma Silhouette) */}
          <div className="figma-hero-visual" ref={searchContainerRef}>
            <div className="figma-brutalist-monitor">
              {/* Top stepped tab */}
              <div className="monitor-top-notch" />
              {/* Main chunky black block containing functional search */}
              <div className="monitor-main-block">
                <form onSubmit={handleSearchSubmit} className="hero-search-form">
                  <div className="monitor-inner-slot">
                    <div className="search-slot-wrapper">
                      <Search size={16} className="search-slot-icon" />
                      <input
                        type="text"
                        className="slot-search-input"
                        placeholder="Search events, workshops..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          setShowDropdown(true)
                        }}
                        onFocus={() => setShowDropdown(true)}
                        aria-label="Search GDG events"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          className="slot-clear-btn"
                          onClick={() => {
                            setSearchQuery('')
                            setSearchResults([])
                          }}
                          aria-label="Clear search query"
                        >
                          <X size={14} />
                        </button>
                      )}
                      <button
                        type="submit"
                        className="slot-submit-btn"
                        title="Search"
                        aria-label="Submit search"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Instant Search Results Dropdown */}
                {showDropdown && searchQuery.trim() && (
                  <div className="hero-search-dropdown">
                    <div className="dropdown-header">
                      <span>Matches for &ldquo;{searchQuery}&rdquo;</span>
                      <button
                        type="button"
                        className="dropdown-close"
                        onClick={() => setShowDropdown(false)}
                      >
                        <X size={12} />
                      </button>
                    </div>

                    {isSearching ? (
                      <div className="dropdown-status-row">
                        <Loader2 size={15} className="spinner-rotate" />
                        <span>Searching events...</span>
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="dropdown-empty-row">
                        No events found matching &ldquo;{searchQuery}&rdquo;
                      </div>
                    ) : (
                      <div className="dropdown-items-list">
                        {searchResults.slice(0, 4).map((evt) => (
                          <Link
                            key={evt.id}
                            to={`/events/${evt.id}`}
                            className="dropdown-event-item"
                            onClick={() => setShowDropdown(false)}
                          >
                            <div className="item-title-text">{evt.title}</div>
                            <div className="item-details-row">
                              <span className="item-category-tag">{evt.category}</span>
                              <span className="item-date-text">
                                {new Date(evt.date_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <Link
                          to={`/events?search=${encodeURIComponent(searchQuery.trim())}`}
                          className="dropdown-view-all-link"
                          onClick={() => setShowDropdown(false)}
                        >
                          See all {searchResults.length} events →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. UPCOMING EVENT SECTION (Exact Figma Match)
          ========================================================= */}
      <section className="figma-section" id="events">
        <h2 className="figma-section-title">Upcoming Event</h2>

        <div className="figma-events-cards-grid">
          {/* Left Card: GDG Orientation (Rounded black-bordered container with gray preview inner) */}
          <div className="figma-event-card card-orientation">
            <div className="card-orientation-top">
              <h3 className="card-pixel-header">{firstEvent.title.toUpperCase()}</h3>
            </div>
            <div className="card-orientation-inner">
              <p className="card-orientation-desc">
                {firstEvent.description}
              </p>
              <div className="card-meta-list">
                <div className="meta-item">
                  <Calendar size={14} />
                  <span>{new Date(firstEvent.date_time).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="meta-item">
                  <Clock size={14} />
                  <span>{new Date(firstEvent.date_time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={14} />
                  <span>{firstEvent.venue}</span>
                </div>
              </div>
              <div className="card-footer-action">
                <Link to={`/events/${firstEvent.id}`} className="figma-action-btn-black">
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Card: Bright Yellow "New Event" Card (Exact Figma Yellow Card) */}
          <div className="figma-event-card card-yellow-accent">
            <div className="yellow-card-top">
              <div className="yellow-card-badge">New Event</div>
            </div>
            <div className="yellow-card-body">
              <h3 className="yellow-event-title">{secondEvent.title}</h3>
              <p className="yellow-event-desc">
                {secondEvent.description}
              </p>
              <div className="yellow-meta-box">
                <div className="meta-item">
                  <Calendar size={14} />
                  <span>{new Date(secondEvent.date_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={14} />
                  <span>{secondEvent.venue}</span>
                </div>
              </div>
              <Link to={`/events/${secondEvent.id}`} className="yellow-register-btn">
                Register Now
              </Link>
            </div>
          </div>
        </div>

        {/* View all events row */}
        <div className="figma-more-events-row">
          <Link to="/events" className="figma-view-all-pill">
            Explore All GDG Events ({events.length || 5}) →
          </Link>
        </div>
      </section>

      {/* =========================================================
          3. MEET THE GDG TEAM SECTION (Exact Figma Match)
          ========================================================= */}
      <section className="figma-section" id="team">
        <div className="figma-team-container">
          {/* Left Column: Pixel Title & Bullet Points */}
          <div className="team-info-box">
            <h2 className="team-pixel-title">
              Meet the<br />
              Google<br />
              Developer<br />
              Group Team
            </h2>
            <p className="team-description">
              Google Developer Group RBU is powered by passionate student developers, designers, and organizers dedicated to sharing knowledge and fostering innovation.
            </p>

            <div className="team-feature-bullets">
              <div className="team-bullet-item">
                <div className="bullet-indicator bullet-green" />
                <div className="bullet-content">
                  <h4>Hands-on Community Sessions</h4>
                  <p>Workshops on Cloud, AI, Web, and Mobile with real implementations.</p>
                </div>
              </div>

              <div className="team-bullet-item">
                <div className="bullet-indicator bullet-blue" />
                <div className="bullet-content">
                  <h4>Networking & Hackathons</h4>
                  <p>Connect with peers, industry mentors, and participate in global hackathons.</p>
                </div>
              </div>

              <div className="team-bullet-item">
                <div className="bullet-indicator bullet-yellow" />
                <div className="bullet-content">
                  <h4>Mentorship & Guidance</h4>
                  <p>Dedicated mentorship from seasoned leads and Google developer experts.</p>
                </div>
              </div>
            </div>

            <div className="team-tech-tags">
              <span className="tech-tag">Web Dev</span>
              <span className="tech-tag">Cloud</span>
              <span className="tech-tag">AI / ML</span>
              <span className="tech-tag">Android</span>
              <span className="tech-tag">Flutter</span>
            </div>
          </div>

          {/* Right Column: Actual Team Photo */}
          <div className="team-photo-frame" id="about">
            <div className="team-photo-inner">
              <img
                src={teamPhoto}
                alt="Google Developer Group Team RBU"
                className="team-img"
              />
              <div className="team-caption-badge">
                <span>GDG RBU Core Team 2026-27</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. FAQS SECTION (Exact Figma Match)
          ========================================================= */}
      <section className="figma-section" id="faqs">
        <h2 className="figma-section-title">FAQs</h2>

        <div className="figma-faqs-list">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx
            return (
              <div
                key={faq.q}
                className={`figma-faq-card ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => setExpandedFaq(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <ChevronDown
                    className={`faq-chevron ${isOpen ? 'rotate' : ''}`}
                    size={20}
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

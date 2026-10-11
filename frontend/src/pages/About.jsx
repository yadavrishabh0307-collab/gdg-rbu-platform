import { Link } from 'react-router-dom'
import teamPhoto from '../assets/team_rbu_members_2026.jpg'
import GdgLogo from '../components/GdgLogo'
import { 
  Globe, 
  Sparkles, 
  Users, 
  Terminal, 
  Calendar, 
  MapPin, 
  Award, 
  Heart,
  ArrowRight,
  Code2,
  Cpu,
  Smartphone,
  Layers,
  Compass
} from 'lucide-react'

// Official Clean Social Icons
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  )
}

export default function About() {
  const tracks = [
    {
      title: 'Web & Cloud Architecture',
      icon: <Code2 size={24} className="track-icon text-blue" />,
      desc: 'Mastering modern web platforms, fullstack architecture, React, Node, and Google Cloud infrastructure.'
    },
    {
      title: 'AI, Machine Learning & GenAI',
      icon: <Cpu size={24} className="track-icon text-green" />,
      desc: 'Exploring Gemini API, Vertex AI, TensorFlow, deep learning models, and real-world intelligent systems.'
    },
    {
      title: 'Mobile Development & Flutter',
      icon: <Smartphone size={24} className="track-icon text-yellow" />,
      desc: 'Crafting cross-platform and native experiences using Flutter, Dart, Android Jetpack, and Kotlin.'
    },
    {
      title: 'Competitive Programming & DSA',
      icon: <Terminal size={24} className="track-icon text-red" />,
      desc: 'Sharpening problem solving, algorithm design, graph theories, and competitive contest problem-solving.'
    },
    {
      title: 'UI/UX & Product Design',
      icon: <Layers size={24} className="track-icon text-purple" />,
      desc: 'Designing accessible, neo-brutalist, and human-centered design systems with Figma and design tokens.'
    }
  ]

  const stats = [
    { label: 'Active Members', value: '1,500+' },
    { label: 'Events & Workshops', value: '35+' },
    { label: 'Production Projects', value: '20+' },
    { label: 'Years of Excellence', value: '5+' }
  ]

  return (
    <div className="figma-container about-page-wrapper">
      {/* 1. HERO TITLE HEADER */}
      <section className="about-hero-section">
        <div className="about-badge-row">
          <span className="about-pill-badge">ABOUT US · OFFICIAL CHAPTER</span>
        </div>
        <h1 className="about-pixel-title">
          BUILDING THE FUTURE OF TECH TOGETHER
        </h1>
        <p className="about-hero-lead">
          Google Developer Groups On Campus · Ramdeobaba University (GDG RBU) is a community 
          of student developers, creators, and innovators turning ideas into impactful technology.
        </p>
      </section>

      {/* 2. DUAL PILLARS: WHAT IS GDG & WHAT IS GDG RBU */}
      <section className="about-pillars-grid">
        {/* Card 1: What is Google Developer Groups? */}
        <div className="about-pillar-card pillar-card-gdg">
          <div className="pillar-header">
            <span className="pillar-tag tag-blue">GLOBAL INITIATIVE</span>
            <div className="pillar-logo-wrap">
              <GdgLogo size={36} />
            </div>
          </div>
          <h2 className="pillar-title">What is GDG?</h2>
          <p className="pillar-body">
            <strong>Google Developer Groups (GDG)</strong> is one of the world's largest developer communities supported by Google Developers. 
            GDG chapters bring together developers who are passionate about learning, building, and exploring Google technologies—from Android and Firebase to Google Cloud, Gemini, and Flutter.
          </p>
          <ul className="pillar-checklist">
            <li>
              <span className="check-bullet bg-blue" />
              <span>Worldwide network of university and professional tech communities</span>
            </li>
            <li>
              <span className="check-bullet bg-green" />
              <span>Direct access to Google Developer Experts (GDEs) and mentors</span>
            </li>
            <li>
              <span className="check-bullet bg-yellow" />
              <span>Global hackathons like Google Solution Challenge</span>
            </li>
          </ul>
        </div>

        {/* Card 2: What is GDG RBU? */}
        <div className="about-pillar-card pillar-card-rbu">
          <div className="pillar-header">
            <span className="pillar-tag tag-yellow">CAMPUS CHAPTER</span>
            <div className="pillar-logo-wrap">
              <GdgLogo size={36} />
            </div>
          </div>
          <h2 className="pillar-title">What is GDG RBU?</h2>
          <p className="pillar-body">
            <strong>GDG On Campus RBU</strong> is the official student chapter at 
            <strong> Ramdeobaba University</strong> (formerly RCOEM, Nagpur), established in <strong>2019</strong>. 
            Under the guidance of Faculty Advisor <strong>Dr. Khushboo Khurana</strong> and an elected student core team, 
            we organize hands-on bootcamps, community hackathons, and real-world development cohorts.
          </p>
          <ul className="pillar-checklist">
            <li>
              <span className="check-bullet bg-red" />
              <span>Flagship initiatives: <strong>WebWiz</strong>, Study Jams & Code for Campus</span>
            </li>
            <li>
              <span className="check-bullet bg-blue" />
              <span>Practical, project-based engineering beyond the classroom syllabus</span>
            </li>
            <li>
              <span className="check-bullet bg-green" />
              <span>Empowering students to solve local campus and societal challenges</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. CORE TEAM SHOWCASE */}
      <section className="about-team-showcase-section">
        <div className="about-team-grid">
          {/* Photo Frame */}
          <div className="about-team-photo-frame">
            <div className="about-team-photo-inner">
              <img
                src={teamPhoto}
                alt="GDG RBU Core Team Members"
                className="about-team-img"
              />
              <div className="about-photo-badge">
                <span>GDG RBU Core Team 2026-27</span>
              </div>
            </div>
          </div>

          {/* Narrative & Values */}
          <div className="about-team-story-card">
            <span className="pillar-tag tag-green">THE SQUAD BEHIND THE SCENES</span>
            <h3 className="story-title">Driven by Students, Powered by Passion</h3>
            <p className="story-desc">
              Every workshop, study jam, and competition is conceived and driven by a passionate 
              team of undergraduate developers, designers, and community leads from Ramdeobaba University.
            </p>
            <div className="story-values-list">
              <div className="story-value-item">
                <div className="value-icon-box bg-blue">
                  <Compass size={18} />
                </div>
                <div>
                  <h4>Peer-to-Peer Learning</h4>
                  <p>Students teaching students through hands-on code labs and interactive sessions.</p>
                </div>
              </div>
              <div className="story-value-item">
                <div className="value-icon-box bg-yellow">
                  <Heart size={18} />
                </div>
                <div>
                  <h4>Inclusive & Welcoming</h4>
                  <p>From first-year beginners to seasoned open-source contributors, everyone belongs.</p>
                </div>
              </div>
              <div className="story-value-item">
                <div className="value-icon-box bg-red">
                  <Award size={18} />
                </div>
                <div>
                  <h4>Real-World Impact</h4>
                  <p>Building usable projects, participating in national hackathons, and fostering career opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOMAINS & TECHNICAL TRACKS */}
      <section className="about-tracks-section">
        <h2 className="tracks-header-title">OUR SPECIALIZED DOMAINS</h2>
        <div className="tracks-grid">
          {tracks.map((track, idx) => (
            <div key={idx} className="track-card">
              <div className="track-icon-wrapper">
                {track.icon}
              </div>
              <h3 className="track-title">{track.title}</h3>
              <p className="track-desc">{track.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COMMUNITY NUMBERS & METRICS */}
      <section className="about-stats-strip">
        {stats.map((s, idx) => (
          <div key={idx} className="about-stat-item">
            <div className="about-stat-num">{s.value}</div>
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* 6. OFFICIAL SOCIAL CONNECT SECTION */}
      <section className="about-social-connect-card">
        <div className="social-connect-inner">
          <div className="social-connect-text">
            <h2>STAY CONNECTED WITH GDG RBU</h2>
            <p>
              Follow our official social media channels for real-time updates, registrations, 
              workshops, and community announcements!
            </p>
          </div>
          <div className="social-connect-actions">
            <a
              href="https://www.instagram.com/gdg_rbu/"
              target="_blank"
              rel="noreferrer"
              className="about-social-pill pill-instagram"
            >
              <InstagramIcon size={18} />
              <span>@gdg_rbu</span>
            </a>
            <a
              href="https://in.linkedin.com/company/gdg-rbu"
              target="_blank"
              rel="noreferrer"
              className="about-social-pill pill-linkedin"
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn / gdg-rbu</span>
            </a>
            <a
              href="https://x.com/gdsc_rcoem"
              target="_blank"
              rel="noreferrer"
              className="about-social-pill pill-twitter"
            >
              <TwitterIcon size={18} />
              <span>@gdsc_rcoem</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

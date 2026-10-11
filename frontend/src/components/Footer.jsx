import GdgLogo from './GdgLogo'
import GoogleShapesBanner from './GoogleShapesBanner'
import { MapPin, Mail } from 'lucide-react'

// Clean SVGs for Social Icons
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

export default function Footer() {
  return (
    <footer className="gdg-footer-wrapper">
      <div className="gdg-footer-card">
        {/* Header Branding */}
        <div className="footer-header-branding">
          <GdgLogo size={48} />
          <h3 className="footer-brand-title">Google Developer Groups</h3>
          <p className="footer-brand-subtitle">On Campus · Ramdeobaba University</p>
        </div>

        {/* Footer Info Cards Grid */}
        <div className="footer-cards-grid">
          {/* Card 1: Location */}
          <div className="footer-info-card card-blue">
            <div className="footer-card-icon">
              <MapPin size={18} />
            </div>
            <div className="footer-card-content">
              <div className="footer-card-label">Campus Location</div>
              <div className="footer-card-value">
                Ramdeobaba University, Katol Road, Lonand, Nagpur-440013
              </div>
            </div>
          </div>

          {/* Card 2: Contact */}
          <div className="footer-info-card card-yellow">
            <div className="footer-card-icon">
              <Mail size={18} />
            </div>
            <div className="footer-card-content">
              <div className="footer-card-label">Get in Touch</div>
              <a href="mailto:gdg@rknec.edu" className="footer-card-value footer-link">
                gdg@rknec.edu
              </a>
            </div>
          </div>

          {/* Card 3: Socials */}
          <div className="footer-info-card card-purple">
            <div className="footer-card-header-mini">Follow us</div>
            <div className="footer-social-icons">
              <a
                href="https://www.instagram.com/gdg_rbu/"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="Instagram @gdg_rbu"
                title="Instagram @gdg_rbu"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://in.linkedin.com/company/gdg-rbu"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="LinkedIn GDG RBU"
                title="LinkedIn GDG RBU (https://in.linkedin.com/company/gdg-rbu)"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://x.com/gdsc_rcoem"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="X / Twitter @gdsc_rcoem"
                title="X / Twitter @gdsc_rcoem"
              >
                <TwitterIcon size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Festive Google Shapes Banner */}
        <div className="footer-bottom-bar">
          <GoogleShapesBanner />
          <div className="footer-bottom-badge">
            <span>© 2026-27 Google Developer Groups On Campus · Ramdeobaba University</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

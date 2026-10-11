import { useState, useEffect } from 'react'
import GdgLogo from './GdgLogo'

export default function FloatingSideLogo() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Subtle floating motion synchronized with scroll
  const translateY = Math.sin(scrollY / 120) * 6

  return (
    <aside
      className="floating-side-gdg"
      style={{
        transform: `translateY(${translateY}px)`
      }}
      onClick={scrollToTop}
      title="Google Developer Groups • Back to top"
      aria-label="Google Developer Groups logo badge"
    >
      <div className="floating-logo-card">
        <GdgLogo size={36} />
      </div>
    </aside>
  )
}

export default function GdgLogo({ size = 36, className = '', alt = 'Google Developer Groups' }) {
  return (
    <img
      src="/gdg-logo.png"
      alt={alt}
      style={{
        height: `${size}px`,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
        objectFit: 'contain'
      }}
      className={`gdg-official-logo ${className}`}
    />
  )
}

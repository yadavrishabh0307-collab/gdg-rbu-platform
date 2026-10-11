export default function GoogleShapesBanner() {
  return (
    <div className="google-shapes-banner-wrapper">
      <svg
        className="google-shapes-svg"
        viewBox="0 0 1200 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Red semicircle */}
        <path d="M 20 54 A 24 24 0 0 1 68 54 Z" fill="#EA4335" />
        {/* Yellow pill */}
        <rect x="80" y="22" width="46" height="32" rx="16" fill="#FBBC04" transform="rotate(-15 103 38)" />
        {/* Green arc */}
        <path d="M 140 18 A 36 36 0 0 1 176 54 L 140 54 Z" fill="#34A853" />
        {/* Blue circle */}
        <circle cx="204" cy="38" r="16" fill="#4285F4" />
        {/* Red triangle */}
        <polygon points="234,54 254,16 274,54" fill="#EA4335" />
        {/* Yellow wedge */}
        <path d="M 290 54 A 28 28 0 0 1 332 30 L 318 54 Z" fill="#FBBC04" />
        {/* Green capsule */}
        <rect x="344" y="24" width="50" height="26" rx="13" fill="#34A853" />
        {/* Blue quarter circle */}
        <path d="M 410 54 A 32 32 0 0 0 442 22 L 410 22 Z" fill="#4285F4" />
        {/* Red dot */}
        <circle cx="468" cy="38" r="14" fill="#EA4335" />
        {/* Yellow block */}
        <rect x="496" y="26" width="30" height="28" rx="6" fill="#FBBC04" />
        {/* Green semicircle */}
        <path d="M 542 54 A 22 22 0 0 1 586 54 Z" fill="#34A853" />
        {/* Blue wedge */}
        <polygon points="600,54 624,20 648,54" fill="#4285F4" />
        {/* Red pill */}
        <rect x="662" y="20" width="44" height="30" rx="15" fill="#EA4335" transform="rotate(12 684 35)" />
        {/* Yellow circle */}
        <circle cx="730" cy="38" r="16" fill="#FBBC04" />
        {/* Green quarter circle */}
        <path d="M 760 54 A 32 32 0 0 1 792 22 L 760 22 Z" fill="#34A853" />
        {/* Blue pill */}
        <rect x="806" y="26" width="52" height="26" rx="13" fill="#4285F4" />
        {/* Red triangle */}
        <polygon points="874,54 896,18 918,54" fill="#EA4335" />
        {/* Yellow arc */}
        <path d="M 934 54 A 24 24 0 0 1 974 54 Z" fill="#FBBC04" />
        {/* Green circle */}
        <circle cx="998" cy="38" r="15" fill="#34A853" />
        {/* Blue polygon */}
        <polygon points="1026,54 1046,24 1066,54" fill="#4285F4" />
        {/* Red wedge */}
        <path d="M 1080 20 A 34 34 0 0 1 1120 54 L 1080 54 Z" fill="#EA4335" />
        {/* Yellow pill */}
        <rect x="1134" y="24" width="44" height="28" rx="14" fill="#FBBC04" />
      </svg>
    </div>
  )
}

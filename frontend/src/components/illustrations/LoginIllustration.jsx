export default function LoginIllustration() {
  return (
    <svg viewBox="0 0 450 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[420px] mx-auto">
      {/* Background Decorative Circles & Waves */}
      <circle cx="225" cy="220" r="160" fill="#fffdf0" />
      <path d="M 60 300 Q 180 370 380 320" stroke="#f5c518" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
      
      {/* Decorative Dots Pattern */}
      <g fill="#f5c518" opacity="0.35">
        <circle cx="340" cy="90" r="3" />
        <circle cx="355" cy="90" r="3" />
        <circle cx="370" cy="90" r="3" />
        <circle cx="340" cy="105" r="3" />
        <circle cx="355" cy="105" r="3" />
        <circle cx="370" cy="105" r="3" />
        <circle cx="340" cy="120" r="3" />
        <circle cx="355" cy="120" r="3" />
        <circle cx="370" cy="120" r="3" />
      </g>

      {/* Floating Currency Badge ($ / Rs.) */}
      <g transform="translate(300, 150)">
        <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#f5c518" strokeWidth="2" filter="drop-shadow(0px 4px 10px rgba(245,197,24,0.25))" />
        <text x="24" y="30" textAnchor="middle" fill="#f5c518" fontSize="20" fontWeight="bold" fontFamily="sans-serif">Rs.</text>
      </g>

      {/* Floating Chart Card Badge */}
      <g transform="translate(280, 210)">
        <rect x="0" y="0" width="70" height="50" rx="12" fill="#ffffff" stroke="#e8e9ef" strokeWidth="1.5" filter="drop-shadow(0px 6px 14px rgba(26,26,46,0.06))" />
        <path d="M 12 35 L 26 24 L 40 28 L 58 14" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="58" cy="14" r="3" fill="#22c55e" />
      </g>

      {/* Desk Surface */}
      <path d="M 30 320 L 420 320" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

      {/* Potted Plant */}
      <path d="M 55 320 L 60 290 L 75 290 L 80 320 Z" fill="#ffffff" stroke="#1a1a2e" strokeWidth="2" />
      <path d="M 67 290 Q 50 260 45 250 M 67 290 Q 65 255 60 245 M 67 290 Q 80 260 85 250" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />

      {/* Character Base */}
      {/* Chair Back */}
      <path d="M 100 230 C 100 200 130 200 130 230 L 125 320 L 105 320 Z" fill="#e8e9ef" stroke="#1a1a2e" strokeWidth="2" />

      {/* Person Torso (Yellow Sweater) */}
      <path d="M 120 230 Q 150 215 180 230 L 195 320 L 115 320 Z" fill="#f5c518" stroke="#1a1a2e" strokeWidth="2.5" />
      
      {/* Laptop & Hands */}
      {/* Laptop Screen */}
      <rect x="200" y="245" width="85" height="55" rx="6" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="2" />
      <rect x="206" y="251" width="73" height="43" rx="3" fill="#ffffff" />
      {/* Laptop screen chart lines */}
      <path d="M 215 282 L 230 272 L 245 277 L 265 262" stroke="#f5c518" strokeWidth="2" strokeLinecap="round" />
      <rect x="215" y="260" width="20" height="4" rx="2" fill="#1a1a2e" opacity="0.3" />

      {/* Laptop Base */}
      <path d="M 185 300 L 300 300 L 290 306 L 195 306 Z" fill="#d0d1db" stroke="#1a1a2e" strokeWidth="2" />

      {/* Arms & Hands */}
      <path d="M 155 240 Q 175 270 210 290" stroke="#f5c518" strokeWidth="18" strokeLinecap="round" />
      <path d="M 155 240 Q 175 270 210 290" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="212" cy="290" r="7" fill="#fcd34d" stroke="#1a1a2e" strokeWidth="2" />

      {/* Person Head & Hair */}
      <circle cx="150" cy="180" r="22" fill="#fcd34d" stroke="#1a1a2e" strokeWidth="2.5" />
      {/* Hair */}
      <path d="M 130 185 C 125 150 160 145 170 160 C 175 175 170 205 160 215 C 150 215 135 205 130 185 Z" fill="#1a1a2e" />
      {/* Face details */}
      <circle cx="160" cy="180" r="2.5" fill="#1a1a2e" />
      <path d="M 158 188 Q 163 192 166 188" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />

      {/* Coffee Mug on Desk */}
      <rect x="315" y="295" width="18" height="25" rx="3" fill="#ffffff" stroke="#1a1a2e" strokeWidth="2" />
      <path d="M 333 302 C 340 302 340 312 333 312" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      {/* Steam */}
      <path d="M 320 288 Q 323 282 320 276 M 327 288 Q 330 282 327 276" stroke="#f5c518" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Wallet / Savings Element on Desk */}
      <rect x="345" y="298" width="35" height="22" rx="5" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="2" />
      <circle cx="362" cy="309" r="3" fill="#f5c518" />
    </svg>
  );
}

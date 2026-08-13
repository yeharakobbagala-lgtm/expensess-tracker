export default function RegisterIllustration() {
  return (
    <svg viewBox="0 0 450 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[420px] mx-auto">
      {/* Background Decorative Circles & Glow */}
      <circle cx="225" cy="200" r="160" fill="#fffdf0" />
      
      {/* Golden Sparkles */}
      <g fill="#f5c518">
        <circle cx="80" cy="90" r="3" />
        <circle cx="370" cy="110" r="3.5" />
        <path d="M 340 70 L 343 76 L 349 79 L 343 82 L 340 88 L 337 82 L 331 79 L 337 76 Z" opacity="0.8" />
      </g>

      {/* Target Milestone Card Badge */}
      <g transform="translate(60, 110)">
        <rect x="0" y="0" width="100" height="60" rx="14" fill="#ffffff" stroke="#e8e9ef" strokeWidth="1.5" filter="drop-shadow(0px 6px 14px rgba(26,26,46,0.06))" />
        <circle cx="24" cy="30" r="14" fill="#22c55e" opacity="0.15" />
        <path d="M 18 30 L 22 34 L 30 24" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="46" y="22" width="42" height="6" rx="3" fill="#1a1a2e" opacity="0.8" />
        <rect x="46" y="34" width="28" height="5" rx="2.5" fill="#f5c518" />
      </g>

      {/* Floating Target Flag Badge */}
      <g transform="translate(310, 180)">
        <circle cx="25" cy="25" r="22" fill="#ffffff" stroke="#f5c518" strokeWidth="2" filter="drop-shadow(0px 4px 10px rgba(245,197,24,0.25))" />
        <path d="M 18 33 L 18 16 L 32 21 L 18 26" fill="#f5c518" stroke="#f5c518" strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      {/* Desk Ground Line */}
      <path d="M 30 330 L 420 330" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

      {/* Savings Glass Jar with Coins */}
      <g transform="translate(240, 180)">
        {/* Jar Body Glass */}
        <rect x="10" y="30" width="90" height="120" rx="16" fill="#ffffff" opacity="0.6" stroke="#1a1a2e" strokeWidth="3" />
        {/* Jar Neck & Lid */}
        <rect x="25" y="15" width="60" height="15" rx="5" fill="#f5c518" stroke="#1a1a2e" strokeWidth="2.5" />
        
        {/* Coins inside jar */}
        <ellipse cx="55" cy="135" rx="30" ry="8" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="40" cy="122" rx="22" ry="7" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="68" cy="115" rx="20" ry="6.5" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="50" cy="100" rx="24" ry="7" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="58" cy="85" rx="22" ry="6.5" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
        
        {/* Jar Label */}
        <rect x="26" y="55" width="58" height="28" rx="6" fill="#ffffff" stroke="#d0d1db" strokeWidth="1.5" />
        <text x="55" y="73" textAnchor="middle" fill="#1a1a2e" fontSize="11" fontWeight="bold" fontFamily="sans-serif">GOALS</text>
      </g>

      {/* Character Standing & Dropping Coin */}
      {/* Torso (Yellow Sweater) */}
      <path d="M 120 220 Q 150 200 170 220 L 180 330 L 110 330 Z" fill="#f5c518" stroke="#1a1a2e" strokeWidth="2.5" />
      
      {/* Arms extended towards Jar */}
      <path d="M 140 230 Q 190 200 245 160" stroke="#f5c518" strokeWidth="16" strokeLinecap="round" />
      <path d="M 140 230 Q 190 200 245 160" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Hand holding coin */}
      <circle cx="248" cy="158" r="7" fill="#fcd34d" stroke="#1a1a2e" strokeWidth="2" />
      
      {/* Coin in Air falling into Jar */}
      <ellipse cx="270" cy="165" rx="14" ry="6" fill="#f5c518" stroke="#d97706" strokeWidth="2" />
      <text x="270" y="168" textAnchor="middle" fill="#d97706" fontSize="8" fontWeight="bold">Rs.</text>

      {/* Person Head & Hair */}
      <circle cx="135" cy="170" r="22" fill="#fcd34d" stroke="#1a1a2e" strokeWidth="2.5" />
      {/* Hair */}
      <path d="M 115 175 C 110 140 145 135 155 150 C 160 165 155 195 145 205 C 135 205 120 195 115 175 Z" fill="#1a1a2e" />
      {/* Face details */}
      <circle cx="145" cy="170" r="2.5" fill="#1a1a2e" />
      <path d="M 143 178 Q 148 182 151 178" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />

      {/* Small Plant next to Jar */}
      <path d="M 360 330 L 366 305 L 380 305 L 385 330 Z" fill="#ffffff" stroke="#1a1a2e" strokeWidth="2" />
      <path d="M 373 305 Q 360 280 355 270 M 373 305 Q 373 275 370 265 M 373 305 Q 385 280 390 270" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

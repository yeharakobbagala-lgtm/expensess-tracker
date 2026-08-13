export default function AddExpenseIllustration() {
  return (
    <svg viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[340px] mx-auto">
      {/* Background Soft Glow & Waves */}
      <circle cx="200" cy="240" r="170" fill="#fffdf0" opacity="0.8" />
      <circle cx="200" cy="240" r="140" fill="#fff9d6" opacity="0.5" />
      
      {/* Sparkles / Golden Stars */}
      <g fill="#f5c518">
        <path d="M 60 120 L 64 128 L 72 132 L 64 136 L 60 144 L 56 136 L 48 132 L 56 128 Z" opacity="0.7" />
        <path d="M 330 180 L 333 186 L 339 189 L 333 192 L 330 198 L 327 192 L 321 189 L 327 186 Z" opacity="0.8" />
        <circle cx="90" cy="280" r="2.5" opacity="0.5" />
        <circle cx="310" cy="360" r="3" opacity="0.6" />
      </g>

      {/* Grid Pattern */}
      <g fill="#f5c518" opacity="0.25">
        <circle cx="280" cy="400" r="2" />
        <circle cx="292" cy="400" r="2" />
        <circle cx="304" cy="400" r="2" />
        <circle cx="280" cy="412" r="2" />
        <circle cx="292" cy="412" r="2" />
        <circle cx="304" cy="412" r="2" />
      </g>

      {/* Smartphone Device Frame */}
      <rect x="120" y="80" width="160" height="290" rx="28" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="4" />
      <rect x="128" y="90" width="144" height="270" rx="20" fill="#2d2e4a" />
      {/* Notch */}
      <rect x="175" y="96" width="50" height="6" rx="3" fill="#1a1a2e" />

      {/* Smartphone Screen Dashboard Mockup */}
      <rect x="140" y="115" width="120" height="40" rx="8" fill="#ffffff" opacity="0.9" />
      <rect x="150" y="125" width="50" height="6" rx="3" fill="#1a1a2e" opacity="0.6" />
      <rect x="150" y="136" width="35" height="10" rx="3" fill="#22c55e" />
      <rect x="235" y="125" width="15" height="20" rx="4" fill="#f5c518" />

      {/* Long Printed Receipt Paper Emerging from Phone */}
      <g transform="translate(142, 140)">
        {/* Shadow */}
        <path d="M 10 20 L 106 20 L 106 220 L 98 212 L 90 220 L 82 212 L 74 220 L 66 212 L 58 220 L 50 212 L 42 220 L 34 212 L 26 220 L 18 212 L 10 220 Z" fill="#000000" opacity="0.08" />
        {/* Paper Body */}
        <path d="M 6 10 L 102 10 L 102 210 L 94 202 L 86 210 L 78 202 L 70 210 L 62 202 L 54 210 L 46 202 L 38 210 L 30 202 L 22 210 L 14 202 L 6 210 Z" fill="#ffffff" stroke="#e8e9ef" strokeWidth="2" />
        
        {/* Receipt Header Icon */}
        <circle cx="54" cy="32" r="10" fill="#f5c518" opacity="0.2" />
        <path d="M 49 32 L 53 36 L 60 28" stroke="#f5c518" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Receipt Items Lines */}
        <rect x="20" y="52" width="68" height="4" rx="2" fill="#1a1a2e" opacity="0.7" />
        <rect x="20" y="64" width="40" height="3" rx="1.5" fill="#8a8a9a" />
        <rect x="70" y="64" width="18" height="3" rx="1.5" fill="#1a1a2e" opacity="0.8" />
        
        <rect x="20" y="74" width="48" height="3" rx="1.5" fill="#8a8a9a" />
        <rect x="70" y="74" width="18" height="3" rx="1.5" fill="#1a1a2e" opacity="0.8" />

        <rect x="20" y="84" width="35" height="3" rx="1.5" fill="#8a8a9a" />
        <rect x="70" y="84" width="18" height="3" rx="1.5" fill="#1a1a2e" opacity="0.8" />

        {/* Dashed Separator */}
        <path d="M 18 98 L 90 98" stroke="#d0d1db" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Total Price */}
        <rect x="20" y="108" width="30" height="5" rx="2.5" fill="#1a1a2e" />
        <rect x="62" y="106" width="26" height="9" rx="3" fill="#f5c518" />

        {/* Barcode Lines */}
        <rect x="25" y="130" width="3" height="24" fill="#1a1a2e" />
        <rect x="31" y="130" width="5" height="24" fill="#1a1a2e" />
        <rect x="39" y="130" width="2" height="24" fill="#1a1a2e" />
        <rect x="44" y="130" width="6" height="24" fill="#1a1a2e" />
        <rect x="53" y="130" width="3" height="24" fill="#1a1a2e" />
        <rect x="59" y="130" width="4" height="24" fill="#1a1a2e" />
        <rect x="66" y="130" width="2" height="24" fill="#1a1a2e" />
        <rect x="71" y="130" width="5" height="24" fill="#1a1a2e" />
        <rect x="79" y="130" width="3" height="24" fill="#1a1a2e" />
      </g>

      {/* Dark Navy Leather Wallet */}
      <g transform="translate(60, 280)">
        {/* Back Wallet Layer */}
        <rect x="0" y="20" width="150" height="110" rx="18" fill="#151628" stroke="#1a1a2e" strokeWidth="3" />
        {/* Main Wallet Body */}
        <rect x="8" y="0" width="145" height="120" rx="20" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="3" />
        {/* Wallet Flap & Button */}
        <path d="M 8 30 C 60 45 100 45 153 30 L 153 100 Q 153 120 133 120 L 28 120 Q 8 120 8 100 Z" fill="#242542" />
        <circle cx="125" cy="70" r="10" fill="#f5c518" stroke="#ffffff" strokeWidth="2" />
        <circle cx="125" cy="70" r="4" fill="#1a1a2e" />
      </g>

      {/* Stacked Golden Coins (Front Left) */}
      <g transform="translate(135, 360)">
        {/* Coin Stack 1 (Back Left) */}
        <ellipse cx="25" cy="30" rx="20" ry="8" fill="#d97706" />
        <rect x="5" y="30" width="40" height="12" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="25" cy="30" rx="20" ry="8" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />

        <rect x="5" y="20" width="40" height="10" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="25" cy="20" rx="20" ry="8" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />

        <rect x="5" y="10" width="40" height="10" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="25" cy="10" rx="20" ry="8" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
        <text x="25" y="13" textAnchor="middle" fill="#d97706" fontSize="10" fontWeight="bold">Rs.</text>

        {/* Coin Stack 2 (Front Right) */}
        <g transform="translate(35, 20)">
          <rect x="5" y="30" width="40" height="12" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
          <ellipse cx="25" cy="30" rx="20" ry="8" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />

          <rect x="5" y="20" width="40" height="10" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
          <ellipse cx="25" cy="20" rx="20" ry="8" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />

          <rect x="5" y="10" width="40" height="10" fill="#f5c518" stroke="#d97706" strokeWidth="1.5" />
          <ellipse cx="25" cy="10" rx="20" ry="8" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
          <text x="25" y="13" textAnchor="middle" fill="#d97706" fontSize="10" fontWeight="bold">Rs.</text>
        </g>
      </g>

      {/* Small Potted Plant (Left Side) */}
      <g transform="translate(45, 260)">
        <path d="M 12 50 L 18 25 L 34 25 L 40 50 Z" fill="#ffffff" stroke="#1a1a2e" strokeWidth="2" />
        <path d="M 26 25 Q 10 5 2 0 M 26 25 Q 26 0 24 -8 M 26 25 Q 40 5 48 0" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

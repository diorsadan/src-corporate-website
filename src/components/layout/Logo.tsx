export function Logo() {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 5 50 Q 15 45, 40 46 Q 60 47, 80 48 Q 95 48.5, 110 50 L 110 55 L 5 55 Z"
        fill="#84cc16"
      />

      <g>
        <rect x="18" y="30" width="28" height="20" fill="none" stroke="#059669" strokeWidth="2.5" />
        <path d="M 17 30 L 32 18 L 47 30 Z" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinejoin="miter" />
        <rect x="18" y="30" width="28" height="20" fill="none" stroke="#111827" strokeWidth="0.8" />
        <path d="M 17 30 L 32 18 L 47 30 Z" fill="none" stroke="#111827" strokeWidth="0.8" strokeLinejoin="miter" />
      </g>

      <path d="M 15 32 L 30 20 L 45 32" fill="none" stroke="#84cc16" strokeWidth="2.5" strokeLinejoin="miter" />

      <g transform="translate(52, 18)">
        <rect x="3" y="20" width="3" height="8" fill="#84cc16" />
        <path d="M 4.5 20 L 0 26 L 9 26 Z" fill="#84cc16" />
        <path d="M 4.5 16 L 0 22 L 9 22 Z" fill="#84cc16" />
        <path d="M 4.5 12 L 0 18 L 9 18 Z" fill="#84cc16" />
      </g>

      <g>
        <text x="70" y="35" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#059669" stroke="#111827" strokeWidth="0.5">SRC</text>
      </g>
    </svg>
  );
}

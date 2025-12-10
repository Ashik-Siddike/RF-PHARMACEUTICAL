interface WorldMapProps {
  exportMarkets: Array<{
    country_code: string;
    country_name: string;
    region: string;
  }>;
  onCountryClick?: (countryCode: string) => void;
  selectedCountry?: string;
}

export default function WorldMap({ exportMarkets, onCountryClick, selectedCountry }: WorldMapProps) {
  const exportCountryCodes = new Set(exportMarkets.map(m => m.country_code));

  const countryPaths: Record<string, string> = {
    BD: 'M 660 310 l 8 0 l 2 4 l -1 5 l -4 3 l -5 -2 l -2 -5 z',
    IN: 'M 635 285 l 15 0 l 8 10 l 5 15 l 3 18 l -2 15 l -5 12 l -8 8 l -10 -5 l -5 -10 l -3 -15 l -2 -18 l 2 -15 z',
    PK: 'M 615 270 l 12 0 l 5 8 l 2 12 l -2 10 l -8 5 l -8 -3 l -3 -8 l -2 -12 z',
    NP: 'M 655 295 l 8 0 l 2 4 l -2 4 l -8 0 z',
    LK: 'M 648 350 l 4 0 l 2 6 l -2 6 l -4 0 z',
    AE: 'M 595 305 l 6 0 l 2 4 l -2 4 l -6 0 z',
    SA: 'M 565 295 l 20 0 l 5 10 l 0 15 l -8 10 l -15 0 l -5 -10 l 0 -15 z',
    KE: 'M 540 380 l 8 0 l 3 8 l -3 8 l -8 0 z',
    NG: 'M 485 355 l 8 0 l 3 8 l -3 8 l -8 0 z',
    ZA: 'M 530 450 l 12 0 l 5 12 l -5 12 l -12 0 z',
    GB: 'M 470 220 l 8 0 l 3 8 l -3 8 l -8 0 z',
    DE: 'M 495 230 l 8 0 l 3 8 l -3 8 l -8 0 z',
    US: 'M 180 230 l 80 0 l 10 30 l 0 35 l -15 25 l -70 0 l -10 -30 l 0 -35 z',
    CA: 'M 150 120 l 120 0 l 15 40 l 0 50 l -20 30 l -110 0 l -10 -40 l 0 -50 z',
    AU: 'M 750 420 l 60 0 l 10 20 l 0 30 l -10 20 l -60 0 z',
  };

  const getCountryColor = (countryCode: string) => {
    if (selectedCountry === countryCode) {
      return '#10b981';
    }
    if (exportCountryCodes.has(countryCode)) {
      return '#14b8a6';
    }
    return '#e5e7eb';
  };

  const getCountryOpacity = (countryCode: string) => {
    if (exportCountryCodes.has(countryCode)) {
      return selectedCountry === countryCode ? 1 : 0.85;
    }
    return 0.3;
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 rounded-xl p-4">
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full"
        style={{ maxHeight: '500px' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="600" fill="#e0f2fe" opacity="0.3" rx="10"/>

        <g className="continents" opacity="0.15">
          <path d="M 120 150 Q 200 100 350 150 T 450 250 Q 400 350 300 380 T 150 300 Q 100 220 120 150 Z" fill="#94a3b8" />
          <path d="M 450 200 Q 550 180 700 220 T 850 320 Q 820 450 700 480 T 500 400 Q 450 280 450 200 Z" fill="#94a3b8" />
          <path d="M 700 400 Q 800 380 900 450 L 880 520 Q 750 520 700 480 Z" fill="#94a3b8" />
          <path d="M 420 340 Q 480 330 560 380 T 580 480 L 450 500 Q 400 420 420 340 Z" fill="#94a3b8" />
          <path d="M 100 200 Q 180 180 280 220 T 350 300 L 200 350 Q 120 280 100 200 Z" fill="#94a3b8" />
        </g>

        <g className="grid-lines" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.2">
          {[...Array(12)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" />
          ))}
        </g>

        {Object.entries(countryPaths).map(([code, path]) => (
          <g key={code}>
            <path
              d={path}
              fill={getCountryColor(code)}
              opacity={getCountryOpacity(code)}
              stroke={exportCountryCodes.has(code) ? '#0f766e' : '#9ca3af'}
              strokeWidth={selectedCountry === code ? '2' : '1'}
              className="transition-all duration-300 cursor-pointer"
              style={{
                filter: exportCountryCodes.has(code) ? 'url(#glow)' : 'none',
              }}
              onClick={() => onCountryClick?.(code)}
              onMouseEnter={(e) => {
                if (exportCountryCodes.has(code)) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.transformOrigin = 'center';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
            {exportCountryCodes.has(code) && (
              <>
                <circle
                  cx={path.split(' ')[1]}
                  cy={path.split(' ')[2]}
                  r="3"
                  fill="#ef4444"
                  className="animate-ping"
                  opacity="0.6"
                />
                <circle
                  cx={path.split(' ')[1]}
                  cy={path.split(' ')[2]}
                  r="2"
                  fill="#dc2626"
                />
              </>
            )}
          </g>
        ))}

        <g className="markers">
          {exportMarkets.map((market) => {
            const path = countryPaths[market.country_code];
            if (!path) return null;

            const coords = path.split(' ');
            const x = parseFloat(coords[1]);
            const y = parseFloat(coords[2]);

            return (
              <g key={market.country_code}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#dc2626"
                  stroke="#fff"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all"
                  onClick={() => onCountryClick?.(market.country_code)}
                />
                {selectedCountry === market.country_code && (
                  <g>
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      className="animate-ping"
                      opacity="0.6"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        <g className="legend" transform="translate(20, 520)">
          <rect width="200" height="60" fill="white" opacity="0.9" rx="5" />
          <circle cx="15" cy="20" r="5" fill="#14b8a6" />
          <text x="30" y="25" fontSize="12" fill="#374151">Export Markets</text>
          <circle cx="15" cy="45" r="5" fill="#e5e7eb" />
          <text x="30" y="50" fontSize="12" fill="#374151">Other Countries</text>
        </g>

        <text
          x="500"
          y="30"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill="#0f766e"
          opacity="0.8"
        >
          RF PHARMACEUTICAL - Global Presence
        </text>
      </svg>
    </div>
  );
}

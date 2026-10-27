export default function TrendChart() {
  return (
    <div className="trend-chart">
      <div className="chart-legend">
        <span>
          <i className="blue" />
          New requests
        </span>
        <span>
          <i className="teal" />
          Confirmed
        </span>
        <span>
          <i className="navy" />
          Completed
        </span>
      </div>
      <svg
        viewBox="0 0 700 230"
        preserveAspectRatio="none"
        aria-label="Fictional booking activity chart"
      >
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3568d4" stopOpacity=".22" />
            <stop offset="1" stopColor="#3568d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 85, 130, 175, 220].map((y) => (
          <line key={y} x1="0" x2="700" y1={y} y2={y} stroke="#e7ebf0" />
        ))}
        <path
          d="M0 186 C70 145 95 172 145 124 S220 143 275 92 S360 120 420 69 S520 110 570 55 S640 80 700 28 L700 230 L0 230Z"
          fill="url(#area)"
        />
        <path
          d="M0 186 C70 145 95 172 145 124 S220 143 275 92 S360 120 420 69 S520 110 570 55 S640 80 700 28"
          fill="none"
          stroke="#3568d4"
          strokeWidth="4"
        />
        <path
          d="M0 205 C90 190 120 198 170 160 S270 185 330 135 S420 160 470 112 S570 145 620 95 S680 100 700 72"
          fill="none"
          stroke="#56b7ad"
          strokeWidth="3"
        />
        <path
          d="M0 217 C100 205 160 210 220 187 S320 198 390 161 S500 186 560 143 S650 160 700 125"
          fill="none"
          stroke="#10243a"
          strokeWidth="3"
        />
      </svg>
      <div className="chart-axis">
        <span>Dec 01</span>
        <span>Dec 08</span>
        <span>Dec 15</span>
        <span>Dec 22</span>
        <span>Dec 30</span>
      </div>
    </div>
  )
}

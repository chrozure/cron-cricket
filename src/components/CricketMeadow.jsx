import { useState, useEffect } from 'react'
import './CricketMeadow.css'

const GROUND_Y = 90

const CRICKETS_DESKTOP = [
  { x: 60,  flip: false },
  { x: 158, flip: true  },
  { x: 258, flip: false },
  { x: 368, flip: true  },
  { x: 490, flip: false },
]
const DESKTOP_DELAYS = [0, 3.2, 6.1, 9.4, 11.8]

const CRICKETS_MOBILE = [
  { x: 100, flip: false },
  { x: 300, flip: true  },
  { x: 500, flip: false },
]
const MOBILE_DELAYS = [0, 4.7, 9.3]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// [baseX, height, lean]
const BLADES = [
  [5,19,-2],[17,14,3],[29,22,-3],[41,17,2],[53,20,-4],[67,23,3],
  [80,15,-2],[92,21,4],[105,18,-3],[118,24,2],[131,16,-4],[145,21,3],
  [158,22,-2],[172,17,4],[185,20,-3],[199,24,2],[213,15,-4],[227,21,3],
  [240,18,-2],[254,23,4],[268,16,-3],[282,22,2],[296,19,-4],[310,24,3],
  [323,17,-2],[337,21,4],[351,16,-3],[365,20,2],[379,18,-4],[393,23,3],
  [406,20,-2],[420,25,4],[433,16,-3],[447,21,2],[461,19,-4],[475,23,3],
  [488,18,-2],[502,20,4],[516,22,-3],[530,17,2],[544,25,-4],[558,16,3],
  [572,21,-2],[586,18,4],[598,15,-3],
]

function CricketBody() {
  return (
    <g stroke="#1a5025" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 72,90 Q 60,108 54,126" fill="none" strokeWidth="2.8"/>
      <path d="M 90,96 Q 100,112 108,126" fill="none" strokeWidth="2.8"/>
      <ellipse cx="148" cy="80" rx="66" ry="26" fill="#74cc28" strokeWidth="3.5"/>
      <path d="M 93,67 Q 148,57 208,68" fill="none" stroke="rgba(0,50,0,0.35)" strokeWidth="2"/>
      <path d="M 162,88 L 186,46 L 208,128" fill="none" strokeWidth="3"/>
      <ellipse cx="84" cy="80" rx="24" ry="21" fill="#74cc28" strokeWidth="3.5"/>
      <circle cx="42" cy="80" r="20" fill="#74cc28" strokeWidth="3.5"/>
      <circle cx="34" cy="75" r="4.5" fill="#162818" stroke="none"/>
      <circle cx="32.5" cy="73.5" r="1.5" fill="white" stroke="none"/>
      <path d="M 30,62 Q 10,40 4,16" fill="none" strokeWidth="2.5"/>
      <path d="M 41,61 Q 35,34 50,12" fill="none" strokeWidth="2.5"/>
    </g>
  )
}

export default function CricketMeadow() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 500px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 500px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const [desktopDelays] = useState(() => shuffle(DESKTOP_DELAYS))
  const [mobileDelays] = useState(() => shuffle(MOBILE_DELAYS))

  const scale = isMobile ? 0.44 : 0.3
  const crickets = isMobile ? CRICKETS_MOBILE : CRICKETS_DESKTOP
  const delays = isMobile ? mobileDelays : desktopDelays

  return (
    <div className="cricket-meadow" aria-hidden="true">
      <svg viewBox="0 0 600 110" width="100%" xmlns="http://www.w3.org/2000/svg">
        {/* Sky */}
        <rect x="0" y="0" width="600" height="88" fill="#f6fdf8"/>
        {/* Ground */}
        <rect x="0" y="88" width="600" height="22" fill="#cae080"/>
        {/* Grass blades */}
        {BLADES.map(([x, h, lean], i) => (
          <path
            key={i}
            d={`M ${x-2},88 Q ${x+lean-1},${88-h*0.5} ${x+lean},${88-h} Q ${x+lean+1},${88-h*0.5} ${x+3},88 Z`}
            fill="#cae080"
          />
        ))}
        {/* Crickets */}
        {crickets.map((c, i) => (
          <g key={i} className="meadow-hop" style={{ animationDelay: `${delays[i]}s` }}>
            <g transform={`translate(${c.x},${GROUND_Y}) scale(${c.flip ? -scale : scale},${scale}) translate(-110,-130)`}>
              <CricketBody />
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}

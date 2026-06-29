import { useState, useEffect, useRef, useId } from 'react'
import './Cricket.css'

const CYCLES = 3
const FRAME_MS = 120

export default function Cricket({ chirping = false, size = 180 }) {
  const gradId = useId()
  const [frame, setFrame] = useState(0)
  const [jumping, setJumping] = useState(false)
  const [done, setDone] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!chirping) {
      clearInterval(intervalRef.current)
      setFrame(0)
      setJumping(false)
      setDone(false)
      return
    }
    setJumping(true)
    let cyclesDone = 0
    intervalRef.current = setInterval(() => {
      setFrame(f => {
        const next = (f + 1) % 4
        if (next === 0) {
          cyclesDone++
          if (cyclesDone >= CYCLES) {
            clearInterval(intervalRef.current)
            setJumping(false)
            setDone(true)
          }
        }
        return next
      })
    }, FRAME_MS)
    return () => clearInterval(intervalRef.current)
  }, [chirping])

  const noteOpacity = done ? 1 : jumping ? [0, 0.6, 1, 0.6][frame] : 0

  return (
    <div className={`cricket-wrapper${jumping ? ' jumping' : ''}${done ? ' done' : ''}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 220 140" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="10" y1="12" x2="210" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#c8f55e"/>
            <stop offset="50%"  stopColor="#74cc28"/>
            <stop offset="100%" stopColor="#26783a"/>
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="118" cy="133" rx="82" ry="5.5" fill="rgba(0,0,0,0.09)"/>

        <g stroke="#1a5025" strokeLinecap="round" strokeLinejoin="round">

          {/* All legs drawn first so body/pronotum/head cover their attachment points */}

          {/* Front leg */}
          <path d="M 72,90 Q 60,108 54,126" fill="none" strokeWidth="2.8"/>

          {/* Mid leg */}
          <path d="M 90,96 Q 100,112 108,126" fill="none" strokeWidth="2.8"/>

          {/* Main body */}
          <ellipse cx="148" cy="80" rx="66" ry="26" fill={`url(#${gradId})`} strokeWidth="3.5"/>

          {/* Wing fold line */}
          <path d="M 93,67 Q 148,57 208,68" fill="none" stroke="rgba(0,50,0,0.25)" strokeWidth="2"/>

          {/* Hind leg — near side, on top of body */}
          <path d="M 162,88 L 186,46 L 208,128" fill="none" strokeWidth="3"/>

          {/* Pronotum */}
          <ellipse cx="84" cy="80" rx="24" ry="21" fill={`url(#${gradId})`} strokeWidth="3.5"/>

          {/* Head */}
          <circle cx="42" cy="80" r="20" fill={`url(#${gradId})`} strokeWidth="3.5"/>

          {/* Eye */}
          <circle cx="34" cy="75" r="4.5" fill="#162818" stroke="none"/>
          <circle cx="32.5" cy="73.5" r="1.5" fill="white" stroke="none"/>

          {/* Antennae */}
          <path d="M 30,62 Q 10,40 4,16" fill="none" strokeWidth="2.5"/>
          <path d="M 41,61 Q 35,34 50,12" fill="none" strokeWidth="2.5"/>

        </g>

        {/* Music notes */}
        <g opacity={noteOpacity} className={done ? 'notes-float' : ''}>
          <text x="178" y="38" fontSize="26" fill="#f4a261" fontWeight="bold">♪</text>
          <text x="196" y="18" fontSize="18" fill="#f4a261" fontWeight="bold">♫</text>
          <text x="162" y="20" fontSize="14" fill="#f4a261" fontWeight="bold">♪</text>
        </g>
      </svg>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tutorialSlides } from '../data/tutorialContent'
import NextRunTimes from '../components/NextRunTimes'
import CricketMeadow from '../components/CricketMeadow'
import Cricket from '../components/Cricket'
import './Tutorial.css'

const FIELD_LABELS = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week']

function renderInline(text) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((p, i) => {
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    return p
  })
}

function renderTable(text) {
  const lines = text.trim().split('\n').filter(l => !l.match(/^\|[-\s|]+\|$/))
  return (
    <table className="tut-table">
      <tbody>
        {lines.map((row, i) => {
          const cells = row.split('|').filter((_, j, a) => j > 0 && j < a.length - 1)
          return (
            <tr key={i}>
              {cells.map((cell, j) =>
                i === 0
                  ? <th key={j}>{cell.trim()}</th>
                  : <td key={j}>{renderInline(cell.trim())}</td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// Renders a slide's content, detecting table blocks (lines starting with |) anywhere in the text
function renderContent(text) {
  return text.split('\n\n').map((block, i) => {
    if (block.trim().startsWith('|')) return <div key={i}>{renderTable(block)}</div>
    return <p key={i}>{renderInline(block)}</p>
  })
}

export default function Tutorial() {
  const [idx, setIdx] = useState(0)
  const nav = useNavigate()
  const slide = tutorialSlides[idx]
  const total = tutorialSlides.length

  return (
    <div className="tutorial">
      <header className="tut-header">
        <button className="back-btn" onClick={() => nav('/')}>← Home</button>
        <div className="tut-progress-bar">
          <div className="tut-progress-fill" style={{ width: `${((idx + 1) / total) * 100}%` }} />
        </div>
        <span className="tut-counter">{idx + 1} / {total}</span>
      </header>

      <div className="tut-card" key={idx}>
        <h2 className="tut-title">{slide.title}</h2>

        <div className="tut-body">
          {renderContent(slide.content)}
        </div>

        {slide.fieldLabels && (
          <div className="cron-anatomy">
            {slide.example.split(' ').map((f, i) => (
              <div key={i} className="anatomy-col">
                <span className="anatomy-field">{f}</span>
                <span className="anatomy-label">{slide.fieldLabels[i]}</span>
                <span className="anatomy-range">{slide.fieldRanges[i]}</span>
              </div>
            ))}
          </div>
        )}

        {slide.example && !slide.fieldLabels && (
          <div className="tut-example">
            <div className="example-expr-row">
              {slide.example.split(' ').map((f, i) => (
                <span key={i} className={`expr-field${slide.highlight?.includes(i) ? ' highlighted' : ''}`}>
                  {f}
                </span>
              ))}
            </div>
            {slide.description && <p className="example-desc">{slide.description}</p>}
            <NextRunTimes expr={slide.example} />
          </div>
        )}

        {slide.isFinal && (
          <div className="tut-summary">
            <div className="syntax-grid">
              {[
                ['*', 'Every value'],
                ['5', 'Specific value'],
                ['1-5', 'Range'],
                ['1,3,5', 'List'],
                ['*/2', 'Every 2nd'],
                ['MON', 'Named day'],
              ].map(([sym, desc]) => (
                <div key={sym} className="syntax-item">
                  <code>{sym}</code>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.isFinal && (
          <div className="tut-final-cricket">
            <Cricket chirping={true} size={150} />
          </div>
        )}
      </div>

      {idx === 0 && <CricketMeadow />}

      <div className="tut-nav">
        <button
          className="tut-btn secondary"
          onClick={() => idx === 0 ? nav('/') : setIdx(i => i - 1)}
        >
          {idx === 0 ? '← Back to Home' : '← Previous'}
        </button>
        {idx < total - 1
          ? <button className="tut-btn primary" onClick={() => setIdx(i => i + 1)}>Next →</button>
          : <button className="tut-btn primary" onClick={() => nav('/')}>Back to home</button>
        }
      </div>
    </div>
  )
}

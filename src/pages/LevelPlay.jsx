import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLevelById, allLevels } from '../data/levelData'
import { expressionsEquivalent, isValidCron } from '../utils/cronValidator'
import { markLevelComplete } from '../utils/storage'
import Cricket from '../components/Cricket'
import NextRunTimes from '../components/NextRunTimes'
import './LevelPlay.css'

const FIELD_LABELS_5 = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week']
const FIELD_LABELS_6 = ['Second', 'Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week']
const FIELD_LABELS_7 = ['Second', 'Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week', 'Year']

function renderHint(hint) {
  const parts = hint.split('`')
  return parts.map((part, i) =>
    i % 2 === 1 ? <code key={i}>{part}</code> : part
  )
}

function getFieldLabels(count) {
  if (count === 6) return FIELD_LABELS_6
  if (count === 7) return FIELD_LABELS_7
  return FIELD_LABELS_5
}

function buildExprFromFields(fields) {
  return fields.map(f => f || '').join(' ').trim()
}

export default function LevelPlay() {
  const { id } = useParams()
  const nav = useNavigate()
  const level = getLevelById(Number(id))
  const nextLevel = level ? allLevels.find(l => l.id === level.id + 1) : null
  const fieldCount = level?.fieldCount ?? 5
  const labels = getFieldLabels(fieldCount)

  const emptyFields = Array(fieldCount).fill('')
  const [fields, setFields] = useState(() => {
    if (!level) return emptyFields
    const f = Array(fieldCount).fill('')
    if (level.lockedFields) {
      Object.entries(level.lockedFields).forEach(([i, v]) => { f[Number(i)] = v })
    }
    return f
  })
  const [fullExpr, setFullExpr] = useState('')
  const [status, setStatus] = useState('idle') // idle | correct | wrong | invalid
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const inputRef = useRef(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (!level) return
    const f = Array(fieldCount).fill('')
    if (level.lockedFields) {
      Object.entries(level.lockedFields).forEach(([i, v]) => { f[Number(i)] = v })
    }
    setFields(f)
    setFullExpr('')
    setStatus('idle')
    setShowHint(false)
    setAttempts(0)
  }, [id])

  useEffect(() => {
    if (!level) return
    const raf = requestAnimationFrame(() => {
      if (level.inputMode === 'fields') firstFieldRef.current?.focus()
      else inputRef.current?.focus()
    })
    return () => cancelAnimationFrame(raf)
  }, [id])

  useEffect(() => {
    if (status !== 'correct') return
    let handler = null
    const tid = setTimeout(() => {
      handler = (e) => {
        if (e.key === 'Enter' && !e.repeat) {
          if (nextLevel) nav(`/levels/${nextLevel.id}`)
          else nav('/levels')
        }
      }
      window.addEventListener('keydown', handler)
    }, 0)
    return () => {
      clearTimeout(tid)
      if (handler) window.removeEventListener('keydown', handler)
    }
  }, [status, nextLevel, nav])

  if (!level) return <div className="level-play"><p>Level not found.</p></div>

  const isFieldMode = level.inputMode === 'fields'

  function getCurrentExpr() {
    if (isFieldMode) return buildExprFromFields(fields)
    return fullExpr.trim()
  }

  function handleSubmit() {
    const expr = getCurrentExpr()
    if (!expr.trim() || expr.split(/\s+/).some(f => !f)) {
      setStatus('invalid')
      return
    }
    if (!isValidCron(expr)) {
      setStatus('invalid')
      setAttempts(a => a + 1)
      return
    }
    if (expressionsEquivalent(expr, level.answer)) {
      setStatus('correct')
      setShowHint(false)
      markLevelComplete(level.id)
    } else {
      setStatus('wrong')
      setAttempts(a => a + 1)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  function setField(i, val) {
    setFields(f => { const n = [...f]; n[i] = val; return n })
    setStatus('idle')
  }

  const currentExpr = getCurrentExpr()
  const previewExpr = isValidCron(currentExpr) ? currentExpr : null


  const activeFieldIndices = isFieldMode
    ? (level.activeFields ?? Array.from({ length: fieldCount }, (_, i) => i))
    : []

  return (
    <div className="level-play">
      <header className="play-header">
        <button className="back-btn" onClick={() => nav('/levels')}>← Levels</button>
        <span className="play-level-label">Level {level.id}</span>
      </header>

      <div className="play-content">
        <div className="play-left">
          <div className="story-card">
            <h2 className="play-title">{level.title}</h2>
            <p className="play-story">{level.story}</p>
            {level.fieldCount > 5 && (
              <p className="field-count-badge">
                {level.fieldCount}-field expression
              </p>
            )}
          </div>

          <div className="cricket-mobile-slot">
            <div className="cricket-area">
              <Cricket size={80} chirping={status === 'correct'} />
            </div>
          </div>

          {isFieldMode ? (
            <div className="fields-input">
              <p className="input-label">Fill in the fields:</p>
              <div className="fields-row">
                {labels.map((label, i) => {
                  const isActive = activeFieldIndices.includes(i)
                  const isLocked = level.lockedFields && level.lockedFields[i] !== undefined
                  return (
                    <div key={i} className={`field-col${!isActive && !isLocked ? ' inactive' : ''}`} style={{ '--i': i }}>
                      <label className="field-label">{label}</label>
                      <input
                        ref={i === activeFieldIndices[0] ? firstFieldRef : null}
                        className={`field-input${isLocked ? ' locked' : ''}`}
                        value={fields[i]}
                        onChange={e => isActive && setField(i, e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLocked || !isActive}
                        placeholder={isActive ? '_' : ''}
                        readOnly={!isActive}
                        aria-label={label}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="expr-preview">
                <span className="expr-preview-label">Expression:</span>
                <code className="expr-preview-val">{currentExpr || '_ _ _ _ _'}</code>
              </div>
            </div>
          ) : (
            <div className="full-input">
              <p className="input-label">Type your cron expression:</p>
              <input
                ref={inputRef}
                className="full-expr-input"
                value={fullExpr}
                onChange={e => { setFullExpr(e.target.value); setStatus('idle') }}
                onKeyDown={handleKeyDown}
                placeholder={fieldCount === 5 ? '_ _ _ _ _' : fieldCount === 6 ? '_ _ _ _ _ _' : '_ _ _ _ _ _ _'}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="Cron expression"
              />
              <p className="field-hint-row">
                {getFieldLabels(fieldCount).map((l, i) => (
                  <span key={i} className="field-hint-item">{l}</span>
                ))}
              </p>
            </div>
          )}

          {status !== 'correct' && (
            <div className="action-row">
              <button
                className="hint-btn"
                onClick={() => setShowHint(s => !s)}
              >
                {showHint ? 'Hide hint' : '💡 Hint'}
              </button>
              <button
                className="submit-btn"
                onClick={handleSubmit}
              >
                Check answer
              </button>
            </div>
          )}

          {showHint && (
            <div className="hint-box">{renderHint(level.hint)}</div>
          )}

          {status === 'correct' && (
            <div className="feedback correct">
              <strong>Correct!</strong> {nextLevel ? 'Well done — your cricket is chirping!' : 'Well done - you have finished all of the challenges!'}
            </div>
          )}
          {status === 'wrong' && (
            <div className="feedback wrong">
              Not quite. {attempts >= 2 && 'Try clicking the hint button.'}
            </div>
          )}
          {status === 'invalid' && (
            <div className="feedback invalid">
              That doesn't look like a valid cron expression. Check your syntax.
            </div>
          )}

          {status === 'correct' && (
            <div className="next-actions">
              <button className="next-btn secondary" onClick={() => nav('/levels')}>Back to levels</button>
              {nextLevel && (
                <button className="next-btn primary" onClick={() => nav(`/levels/${nextLevel.id}`)}>
                  Next level →
                </button>
              )}
            </div>
          )}

          {previewExpr && (
            <div className={`next-run-mobile-slot${status === 'correct' ? ' show-on-correct' : ''}`}>
              <NextRunTimes expr={previewExpr} />
            </div>
          )}
        </div>

        <div className="play-right">
          <div className="cricket-area">
            <Cricket size={140} chirping={status === 'correct'} />
            {status === 'correct' && <p className="chirp-label">Chirp chirp! 🎵</p>}
          </div>
          {previewExpr && status !== 'correct' && <NextRunTimes expr={previewExpr} />}
        </div>
      </div>
    </div>
  )
}

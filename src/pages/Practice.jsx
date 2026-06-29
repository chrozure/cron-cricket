import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomQuestion } from '../data/practiceQuestions'
import { expressionsEquivalent, isValidCron } from '../utils/cronValidator'
import Cricket from '../components/Cricket'
import NextRunTimes from '../components/NextRunTimes'
import './Practice.css'

export default function Practice() {
  const nav = useNavigate()
  const [{ question, idx: qIdx }, setQ] = useState(() => getRandomQuestion())
  const [writeVal, setWriteVal] = useState('')
  const [selected, setSelected] = useState(null)
  const [multiSelected, setMultiSelected] = useState(new Set())
  const [status, setStatus] = useState('idle') // idle | correct | wrong | invalid
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    (question.type === 'mc' || question.type === 'multi') ? shuffle([...question.options]) : []
  )

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  function nextQuestion() {
    const next = getRandomQuestion(qIdx)
    setQ(next)
    setWriteVal('')
    setSelected(null)
    setMultiSelected(new Set())
    setStatus('idle')
    if (next.question.type === 'mc' || next.question.type === 'multi') {
      setShuffledOptions(shuffle([...next.question.options]))
    }
  }

  useEffect(() => {
    if (status !== 'idle') return
    if (question.type === 'mc' && selected === null) return
    if (question.type === 'multi' && multiSelected.size === 0) return
    if (question.type === 'write') return
    const handler = (e) => { if (e.key === 'Enter') handleSubmit() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [status, question.type, selected, multiSelected])

  useEffect(() => {
    if (status !== 'correct') return
    const handler = (e) => { if (e.key === 'Enter') nextQuestion() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [status])

  function handleSubmit() {
    if (status !== 'idle' && status !== 'invalid') return

    if (question.type === 'write') {
      const expr = writeVal.trim()
      if (!expr) return
      if (!isValidCron(expr)) {
        setStatus('invalid')
        return
      }
      const correct = expressionsEquivalent(expr, question.answer)
      setStatus(correct ? 'correct' : 'wrong')
      setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    } else if (question.type === 'multi') {
      if (multiSelected.size === 0) return
      const selectedArr = [...multiSelected]
      const allCorrect =
        question.answers.every(a => selectedArr.includes(a)) &&
        selectedArr.every(s => question.answers.includes(s))
      setStatus(allCorrect ? 'correct' : 'wrong')
      setScore(s => ({ correct: s.correct + (allCorrect ? 1 : 0), total: s.total + 1 }))
    } else {
      if (selected === null) return
      const correct = selected === question.answer
      setStatus(correct ? 'correct' : 'wrong')
      setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    }
  }

  function handleMcSelect(opt) {
    if (status !== 'idle') return
    setSelected(opt)
  }

  function handleMultiToggle(opt) {
    if (status !== 'idle') return
    setMultiSelected(prev => {
      const next = new Set(prev)
      if (next.has(opt)) next.delete(opt)
      else next.add(opt)
      return next
    })
  }

  function optionClass(opt) {
    if (status === 'idle') return selected === opt ? 'mc-opt selected' : 'mc-opt'
    const isCorrect = opt === question.answer
    if (isCorrect) return 'mc-opt correct'
    if (selected === opt && !isCorrect) return 'mc-opt wrong'
    return 'mc-opt'
  }

  function multiOptionClass(opt) {
    if (status === 'idle') return multiSelected.has(opt) ? 'mc-opt selected' : 'mc-opt'
    const isCorrect = question.answers.includes(opt)
    if (isCorrect && multiSelected.has(opt)) return 'mc-opt correct'
    if (isCorrect && !multiSelected.has(opt)) return 'mc-opt missed'
    if (!isCorrect && multiSelected.has(opt)) return 'mc-opt wrong'
    return 'mc-opt'
  }

  const previewExpr = (() => {
    if (question.isMeaning || question.type === 'multi') return null
    if (status === 'correct') return question.answer
    if (question.type === 'write' && isValidCron(writeVal.trim())) return writeVal.trim()
    return null
  })()

  return (
    <div className="practice-page">
      <header className="practice-header">
        <button className="back-btn" onClick={() => nav('/')}>← Home</button>
        <h1 className="practice-title">Free Practice</h1>
        <div className="score-badge">
          {score.correct}/{score.total}
        </div>
      </header>

      <div className="practice-content">
        <div className="practice-left">
          <div className="practice-card" key={`card-${qIdx}`}>
            <p className="q-label">Question</p>
            <p className="q-prompt">{question.prompt}</p>
          </div>

          <div className="cricket-mobile-slot">
            <Cricket size={80} chirping={status === 'correct'} />
          </div>

          {question.type === 'write' ? (
            <div className="write-section" key={`input-${qIdx}`}>
              <input
                className="write-input"
                value={writeVal}
                onChange={e => { setWriteVal(e.target.value); setStatus('idle') }}
                onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); handleSubmit() } }}
                placeholder="_ _ _ _ _"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                disabled={status === 'correct' || status === 'wrong'}
              />
              <p className="field-hint-row">
                {['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'].map(l => (
                  <span key={l} className="field-hint-item">{l}</span>
                ))}
              </p>
            </div>
          ) : question.type === 'multi' ? (
            <div className="mc-section" key={`input-${qIdx}`}>
              <p className="multi-hint">Select all that apply</p>
              {shuffledOptions.map((opt, i) => (
                <button
                  key={i}
                  style={{ '--i': i }}
                  className={multiOptionClass(opt)}
                  onClick={() => handleMultiToggle(opt)}
                  disabled={status !== 'idle'}
                >
                  <span className="mc-letter">{String.fromCharCode(65 + i)}</span>
                  <code className="mc-code">{opt}</code>
                </button>
              ))}
            </div>
          ) : (
            <div className="mc-section" key={`input-${qIdx}`}>
              {shuffledOptions.map((opt, i) => (
                <button
                  key={i}
                  style={{ '--i': i }}
                  className={optionClass(opt)}
                  onClick={() => handleMcSelect(opt)}
                  disabled={status !== 'idle'}
                >
                  <span className="mc-letter">{String.fromCharCode(65 + i)}</span>
                  <code className={question.isMeaning ? 'mc-text-plain' : 'mc-code'}>{opt}</code>
                </button>
              ))}
            </div>
          )}

          {(status === 'idle' || status === 'invalid') && (
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={
                question.type === 'write' ? !writeVal.trim() :
                question.type === 'multi' ? multiSelected.size === 0 :
                selected === null
              }
            >
              Check answer
            </button>
          )}

          {status === 'correct' && (
            <div className="feedback correct">
              <strong>Correct!</strong> Your cricket is chirping!
            </div>
          )}
          {status === 'wrong' && (
            <div className="feedback wrong">
              {question.type === 'multi'
                ? 'Not quite — the correct answers are highlighted above.'
                : <>Not quite — the answer is <code>{question.answer}</code></>
              }
            </div>
          )}
          {status === 'invalid' && (
            <div className="feedback invalid">
              That doesn't look like a valid cron expression.
            </div>
          )}

          {(status === 'correct' || status === 'wrong') && (
            <button className="next-btn" onClick={nextQuestion}>
              Next question →
            </button>
          )}

          {previewExpr && <div className="next-run-mobile-slot"><NextRunTimes expr={previewExpr} /></div>}
        </div>

        <div className="practice-right">
          <Cricket size={130} chirping={status === 'correct'} />
          {previewExpr && <NextRunTimes expr={previewExpr} />}
        </div>
      </div>
    </div>
  )
}

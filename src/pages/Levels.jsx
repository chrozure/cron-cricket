import { useNavigate } from 'react-router-dom'
import { chapters } from '../data/levelData'
import { loadProgress } from '../utils/storage'
import './Levels.css'

export default function Levels() {
  const nav = useNavigate()
  const { completedLevels } = loadProgress()

  const allLevelIds = chapters.flatMap(c => c.levels.map(l => l.id))

  function isUnlocked(levelId) {
    const idx = allLevelIds.indexOf(levelId)
    if (idx === 0) return true
    return !!completedLevels[allLevelIds[idx - 1]]
  }

  let btnIdx = 0

  return (
    <div className="levels-page">
      <header className="levels-header">
        <button className="back-btn" onClick={() => nav('/')}>← Home</button>
        <h1 className="levels-title">Play Levels</h1>
      </header>

      <div className="chapters">
        {chapters.map(chapter => (
          <section key={chapter.id} className="chapter">
            <div className="chapter-header">
              <span className="chapter-emoji">{chapter.emoji}</span>
              <div>
                <h2 className="chapter-title">{chapter.title}</h2>
                <p className="chapter-desc">{chapter.description}</p>
              </div>
            </div>
            <div className="level-grid">
              {chapter.levels.map(level => {
                const done = !!completedLevels[level.id]
                const unlocked = isUnlocked(level.id)
                const i = btnIdx++
                return (
                  <button
                    key={level.id}
                    className={`level-btn${done ? ' done' : ''}${!unlocked ? ' locked' : ''}`}
                    style={{ '--i': i }}
                    onClick={() => unlocked && nav(`/levels/${level.id}`)}
                    disabled={!unlocked}
                    title={level.title}
                  >
                    <span className="level-num">{level.id}</span>
                    <span className="level-icon">
                      {!unlocked ? '🔒' : done ? '✓' : '🦗'}
                    </span>
                    <span className="level-name">{level.title}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

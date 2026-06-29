const KEY = 'cron-cricket-progress'

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : { completedLevels: {} }
  } catch {
    return { completedLevels: {} }
  }
}

export function saveProgress(progress) {
  localStorage.setItem(KEY, JSON.stringify(progress))
}

export function markLevelComplete(levelId) {
  const p = loadProgress()
  p.completedLevels[levelId] = true
  saveProgress(p)
}

export function isLevelComplete(levelId) {
  return !!loadProgress().completedLevels[levelId]
}

export function getCompletedCount() {
  return Object.keys(loadProgress().completedLevels).length
}

import { useMemo } from 'react'
import { getNextRuns, isValidCron } from '../utils/cronValidator'
import './NextRunTimes.css'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(d) {
  const day = DAY_NAMES[d.getDay()]
  const date = d.getDate()
  const month = MONTH_NAMES[d.getMonth()]
  const year = d.getFullYear()
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  const hasSeconds = s !== '00'
  return `${day} ${date} ${month} ${year} at ${h}:${m}${hasSeconds ? ':' + s : ''}`
}

export default function NextRunTimes({ expr }) {
  const runs = useMemo(() => {
    if (!expr || !isValidCron(expr)) return null
    return getNextRuns(expr, 6)
  }, [expr])

  if (!expr) return null

  if (!runs || runs.length === 0) {
    return (
      <div className="next-runs">
        <p className="next-runs-label">Next scheduled runs</p>
        <p className="next-runs-empty">No upcoming runs found</p>
      </div>
    )
  }

  return (
    <div className="next-runs">
      <p className="next-runs-label">Next scheduled runs</p>
      <ol className="next-runs-list">
        {runs.map((d, i) => (
          <li key={i} className={i === 0 ? 'first' : ''}>
            <span className="run-index">{i + 1}</span>
            <span className="run-date">{formatDate(d)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

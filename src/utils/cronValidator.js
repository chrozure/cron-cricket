import CronParser from 'cron-parser'

const DAY_NAMES = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 }
const MONTH_NAMES = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 }

function replaceNames(str, map) {
  return str.replace(/[A-Z]+/gi, m => {
    const v = map[m.toUpperCase()]
    return v !== undefined ? String(v) : m
  })
}

function normalizeField(field, nameMap) {
  if (!nameMap) return field
  return replaceNames(field, nameMap)
}

function parseToFields(expr) {
  const parts = expr.trim().split(/\s+/)
  return parts
}

export function isValidCron(expr) {
  try {
    const parts = expr.trim().split(/\s+/)
    if (parts.length === 5) {
      CronParser.parseExpression(expr)
      return true
    }
    if (parts.length === 6) {
      CronParser.parseExpression(expr, { hasSeconds: true })
      return true
    }
    if (parts.length === 7) {
      // Validate year field separately (1970-2099), rest as 6-field
      const yearField = parts[6]
      const sixField = parts.slice(0, 6).join(' ')
      if (!/^(\*|[0-9]{4}(-[0-9]{4})?(\/[0-9]+)?(,[0-9]{4}(-[0-9]{4})?)*)$/.test(yearField)) return false
      CronParser.parseExpression(sixField, { hasSeconds: true })
      return true
    }
    return false
  } catch {
    return false
  }
}

function parseYearField(yearField) {
  if (yearField === '*') return null
  const years = new Set()
  for (const part of yearField.split(',')) {
    if (part.includes('/')) {
      const [base, step] = part.split('/')
      const start = base === '*' ? 1970 : parseInt(base)
      for (let y = start; y <= 2099; y += parseInt(step)) years.add(y)
    } else if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number)
      for (let y = start; y <= end; y++) years.add(y)
    } else {
      years.add(parseInt(part))
    }
  }
  return years
}

export function getNextRuns(expr, count = 8) {
  try {
    const parts = expr.trim().split(/\s+/)
    const opts = { iterator: true }
    let parseExpr = expr
    let validYears = null
    let maxYear = Infinity

    if (parts.length === 7) {
      parseExpr = parts.slice(0, 6).join(' ')
      opts.hasSeconds = true
      validYears = parseYearField(parts[6])

      if (validYears !== null) {
        const now = new Date()
        const futureYears = [...validYears].filter(y => y >= now.getFullYear())
        if (futureYears.length === 0) return []
        const minFutureYear = Math.min(...futureYears)
        maxYear = Math.max(...futureYears)
        if (minFutureYear > now.getFullYear()) {
          opts.currentDate = new Date(minFutureYear - 1, 11, 31, 23, 59, 59)
        }
      }
    } else if (parts.length === 6) {
      opts.hasSeconds = true
    }

    const interval = CronParser.parseExpression(parseExpr, opts)
    const results = []
    const maxIter = validYears ? count * 1000 : count

    for (let i = 0; i < maxIter && results.length < count; i++) {
      const { value, done } = interval.next()
      if (done) break
      const date = value.toDate()
      if (validYears !== null) {
        if (date.getFullYear() > maxYear) break
        if (!validYears.has(date.getFullYear())) continue
      }
      results.push(date)
    }

    return results
  } catch {
    return []
  }
}

function normalizePart(part, nameMap) {
  let s = part.trim().toUpperCase()
  if (nameMap) s = replaceNames(s, nameMap)
  // Normalize */1 -> *
  s = s.replace(/^\*\/1$/, '*')
  // Sort comma lists
  if (s.includes(',') && !s.includes('/') && !s.includes('-')) {
    s = s.split(',').map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b).join(',')
  }
  return s
}

function normalizeExpr(expr) {
  const parts = expr.trim().split(/\s+/)
  if (parts.length === 5) {
    return [
      normalizePart(parts[0], null),
      normalizePart(parts[1], null),
      normalizePart(parts[2], null),
      normalizePart(parts[3], MONTH_NAMES),
      normalizePart(parts[4], DAY_NAMES),
    ].join(' ')
  }
  if (parts.length === 6) {
    return [
      normalizePart(parts[0], null),
      normalizePart(parts[1], null),
      normalizePart(parts[2], null),
      normalizePart(parts[3], null),
      normalizePart(parts[4], MONTH_NAMES),
      normalizePart(parts[5], DAY_NAMES),
    ].join(' ')
  }
  if (parts.length === 7) {
    return [
      normalizePart(parts[0], null),
      normalizePart(parts[1], null),
      normalizePart(parts[2], null),
      normalizePart(parts[3], null),
      normalizePart(parts[4], MONTH_NAMES),
      normalizePart(parts[5], DAY_NAMES),
      normalizePart(parts[6], null),
    ].join(' ')
  }
  return expr
}

function runsMatch(a, b, count = 20) {
  try {
    const ra = getNextRuns(a, count).map(d => d.getTime())
    const rb = getNextRuns(b, count).map(d => d.getTime())
    if (ra.length !== rb.length) return false
    return ra.every((t, i) => t === rb[i])
  } catch {
    return false
  }
}

export function expressionsEquivalent(userExpr, correctExpr) {
  if (!isValidCron(userExpr)) return false
  if (normalizeExpr(userExpr) === normalizeExpr(correctExpr)) return true
  const userParts = userExpr.trim().split(/\s+/)
  const correctParts = correctExpr.trim().split(/\s+/)
  if (userParts.length === 7 && correctParts.length === 7 &&
      normalizePart(userParts[6], null) !== normalizePart(correctParts[6], null)) {
    return false
  }
  return runsMatch(userExpr, correctExpr)
}

export function fieldCount(expr) {
  return expr.trim().split(/\s+/).length
}

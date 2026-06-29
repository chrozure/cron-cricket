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

export function getNextRuns(expr, count = 8) {
  try {
    const parts = expr.trim().split(/\s+/)
    const opts = { iterator: true }
    let parseExpr = expr
    if (parts.length === 7) {
      parseExpr = parts.slice(0, 6).join(' ')
      opts.hasSeconds = true
    } else if (parts.length === 6) {
      opts.hasSeconds = true
    }
    const interval = CronParser.parseExpression(parseExpr, opts)
    const results = []
    for (let i = 0; i < count; i++) {
      const { value, done } = interval.next()
      if (done) break
      results.push(value.toDate())
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
  return runsMatch(userExpr, correctExpr)
}

export function fieldCount(expr) {
  return expr.trim().split(/\s+/).length
}

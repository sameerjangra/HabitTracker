import dayjs from 'dayjs'

export function daysInMonth(year, month) {
  return dayjs(`${year}-${String(month).padStart(2,'0')}-01`).daysInMonth()
}

export function formatDateYMD(yearMonth, day) {
  const [y,m] = yearMonth.split('-')
  return `${y}-${m}-${String(day).padStart(2,'0')}`
}

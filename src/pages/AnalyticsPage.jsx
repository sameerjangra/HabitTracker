import React from 'react'
import { useHabitStore } from '../stores/useHabitStore'
import Analytics from '../components/Analytics'
import { daysInMonth } from '../utils/date'

export default function AnalyticsPage(){
  const { habits, trackings, month } = useHabitStore()
  const [yearStr, monStr] = month.split('-')
  const year = Number(yearStr)
  const mon = Number(monStr)
  const total = daysInMonth(year, mon)

  const data = habits.map(h => {
    let done = 0
    for (let d = 1; d <= total; d++) {
      const dayKey = `${month}-${String(d).padStart(2,'0')}`
      if (trackings[dayKey]?.[h.id] === 'done') done++
    }
    const pct = Math.round((done / total) * 100)
    return { name: h.title.slice(0,12), value: pct }
  })

  return (
    <div className="max-w-4xl mx-auto ">
      <Analytics data={data} />
    </div>
  )
}

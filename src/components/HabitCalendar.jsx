import React from 'react'
import { useHabitStore } from '../stores/useHabitStore'
import { daysInMonth, formatDateYMD } from '../utils/date'

export default function HabitCalendar(){
  const { habits, trackings, month, toggleTracking } = useHabitStore()
  const [yearStr, monStr] = month.split('-')
  const year = Number(yearStr), mon = Number(monStr)
  const totalDays = daysInMonth(year, mon)

  return (
    <div className="bg-black text-white p-4 rounded border  border-slate-300 overflow-x-auto m-2">
      <div className="grid grid-cols-[220px_1fr] gap-4">
        <div>
          <ul>
            {habits.map(h=> (
              <li key={h.id} className="py-2 border-b flex items-center gap-0 mt-1">
                <div className="w-8 text-center">{h.icon || '🔘'}</div>
                <div className="text-sm">{h.title}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <table className="w-full table-fixed text-center">
            <thead>
              <tr>
                {Array.from({length: totalDays}).map((_,i)=> (
                  <th key={i} className="p-1 text-xs">{i+1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map(h=> (
                <tr key={h.id}>
                  {Array.from({length: totalDays}).map((_,i)=>{
                    const day = i+1
                    const date = formatDateYMD(month, day)
                    const status = trackings?.[date]?.[h.id]
                    return (
                      <td key={date} className="p-1">
                        <button
                          onClick={() => toggleTracking({date, habitId: h.id})}
                          className={`w-7 h-7 inline-flex items-center justify-center  border rounded-full ${status === 'done' ? 'bg-[#0ed7ff] rounded-md text-white' : 'bg-black'}`}
                        >
                          {status === 'done' ? '✓' : ''}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react'
import { useHabitStore } from '../stores/useHabitStore'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { daysInMonth } from '../utils/date'

export default function Dashboard(){
  const { habits, trackings, month, fetchHabits, fetchTrackingsForMonth } = useHabitStore()

  useEffect(()=>{
    fetchHabits()
    fetchTrackingsForMonth(month)
  }, [month])

  const [yearStr, monStr] = month.split('-')
  const year = Number(yearStr)
  const mon = Number(monStr)
  const totalDays = daysInMonth(year, mon)

  const days = Array.from({length: totalDays}).map((_,i)=>{
    const d = i+1
    const date = `${month}-${String(d).padStart(2,'0')}`
    const total = habits.length || 1
    const done = Object.values(trackings?.[date] || {}).filter(s=>s==='done').length
    const pct = Math.round((done/total)*100)
    return { date: String(d), pct }
  })

  const avg = Math.round(days.reduce((a,b)=>a+b.pct,0)/(days.length||1))

  const completedCount = Object.values(trackings || {}).flatMap(d=>Object.values(d)).filter(s=>s==='done').length

  return (
    <div className="space-y-4">
      <div className="bg-black p-4 m-2  rounded border  border-slate-300 flex items-center justify-between">
        <div>
          <h2 className="text-xl text-white font-semibold">{new Date().toLocaleString('default', {month: 'long'})}</h2>
          <div className="text-sm text-gray-500">Number of habits: {habits.length}</div>
        </div>

        <div className="w-1/2">
          <div className="text-sm text-white">Progress</div>
          <div className="bg-gray-200 h-3 rounded mt-1 overflow-hidden">
            <div className="h-3 rounded bg-green-500" style={{ width: `${avg}%` }} />
          </div>
          <div className="text-sm text-right mt-1">{avg}%</div>
        </div>
      </div>

      <div className="bg-black p-4 m-2 rounded shadow border  border-slate-300">
        <h3 className="font-medium mb-2 text-white">Monthly progress</h3>
        <div style={{height:200}}>
          <ResponsiveContainer>
            <AreaChart data={days}>
              <XAxis dataKey="date" />
              <YAxis domain={[0,100]} />
              <Tooltip />
              <Area type="monotone" dataKey="pct" stroke="#16a34a" fill="#dcfce7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-sm text-gray-300">Completed tasks this month: {completedCount}</div>
      </div>
    </div>
  )
}

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Analytics({data}){
  return (
    <div className="bg-black border border-slate-30 text-white p-4 rounded shadow">
      <h3 className="font-medium mb-2">Habit performance</h3>
      <div style={{height:200}}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a"  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

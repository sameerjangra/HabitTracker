import React from 'react'
import Dashboard from '../components/Dashboard'
import HabitCalendar from '../components/HabitCalendar'

export default function Home(){
  return (
    <div className="max-w-6xl mx-auto space-y-6 ">
      <HabitCalendar />
      <Dashboard />
    </div>
  )
}

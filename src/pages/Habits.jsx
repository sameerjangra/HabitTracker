import React, { useState } from 'react'
import { useHabitStore } from '../stores/useHabitStore'
import HabitRow from '../components/HabitRow'

export default function Habits(){
  const { habits, createHabit, updateHabit, deleteHabit } = useHabitStore()

  const [title, setTitle] = useState('')
  const [editingHabit, setEditingHabit] = useState(null)

  const onAdd = async () => {
    if (!title) return
    await createHabit({
      user_id: 'demo',
      title,
      icon: '🔹',
      target_per_week: 7
    })
    setTitle('')
  }

  const onSaveEdit = () => {
    updateHabit(editingHabit.id, {
      title: editingHabit.title,
      icon: editingHabit.icon,
      target_per_week: Number(editingHabit.target_per_week)
    })
    setEditingHabit(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">

      {/* HABIT LIST */}
      <div className="bg-black text-white p-4 rounded shadow">
        <h3 className="font-medium mb-2">Your habits</h3>

        <div className="space-y-2">
          {habits.map(h => (
            <HabitRow
              key={h.id}
              habit={h}
              onEdit={setEditingHabit}
              onDelete={deleteHabit}
            />
          ))}
        </div>
      </div>

      {/* ADD HABIT */}
      <div className="bg-black border border-slate-300 text-white p-4 rounded shadow">
        <h3 className="font-medium mb-2">Add habit</h3>

        <div className="flex gap-2">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 rounded flex-1 bg-black border-slate-400"
            placeholder="New habit title"
          />

          <button
            onClick={onAdd}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingHabit && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded shadow text-white w-80 space-y-4">

            <h3 className="text-lg font-semibold">Edit Habit</h3>

            <div>
              <label className="text-sm">Title</label>
              <input
                value={editingHabit.title}
                onChange={e => setEditingHabit({...editingHabit, title: e.target.value})}
                className="w-full p-2 mt-1 bg-black border rounded"
              />
            </div>

            <div>
              <label className="text-sm">Icon</label>
              <input
                value={editingHabit.icon}
                onChange={e => setEditingHabit({...editingHabit, icon: e.target.value})}
                className="w-full p-2 mt-1 bg-black border rounded"
              />
            </div>

            <div>
              <label className="text-sm">Target per week</label>
              <input
                type="number"
                value={editingHabit.target_per_week}
                onChange={e => setEditingHabit({...editingHabit, target_per_week: e.target.value})}
                className="w-full p-2 mt-1 bg-black border rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingHabit(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={onSaveEdit}
                className="px-3 py-1 bg-blue-500 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

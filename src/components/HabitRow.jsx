import React, { useState } from "react";
import { useHabitStore } from "../stores/useHabitStore";

export default function HabitRow({ habit }) {
  const { updateHabit, deleteHabit } = useHabitStore();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(habit.title);

  const handleSave = () => {
    if (!value.trim()) return;
    updateHabit(habit.id, { title: value });
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-black border border-slate-300 rounded shadow">
      <div className="flex items-center gap-3">
        <div className="text-xl">{habit.icon}</div>

        {editing ? (
          <input
            className="bg-black border border-slate-500 rounded p-1 text-white"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <div className="font-medium">{habit.title}</div>
        )}
      </div>

      <div className="flex gap-2">
        {editing ? (
          <>
            <button onClick={handleSave} className="px-3 py-1 bg-green-600 rounded">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="px-3 py-1 bg-gray-600 rounded">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 border rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteHabit(habit.id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

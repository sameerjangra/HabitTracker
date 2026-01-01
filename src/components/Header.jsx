import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Header(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  }

  return (
    <header className="bg-black text-white border border-[#0ed7ff] mx-28 shadow-md p-4 rounded-md mb-4 shadow-[#0ed7ff]">
      <div className="max-w-6xl mx-auto flex items-center justify-between rounded">
        <h1 className="text-2xl font-semibold">Habit Tracker</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-100">{user?.name || user?.$id || "User"}</div>
          <button onClick={handleLogout} className="px-3 py-1 border rounded text-sm">Logout</button>
        </div>
      </div>
    </header>
  )
}

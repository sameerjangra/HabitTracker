const DB_KEY = 'habit-tracker-db-v1'

function readDB() {
  const raw = localStorage.getItem(DB_KEY)
  if (!raw) {
    const seed = {
      users: [{ id: 'demo', name: 'Demo User', email: 'demo@example.com' }],
      habits: [
        { id: 'h1', user_id: 'demo', title: 'Wake up at 05:00', icon: '⏰', target_per_week: 5 },
        { id: 'h2', user_id: 'demo', title: 'Gym', icon: '💪', target_per_week: 3 },
        { id: 'h3', user_id: 'demo', title: 'Reading / Learning', icon: '📘', target_per_week: 7 },
        { id: 'h4', user_id: 'demo', title: 'Budget Tracking', icon: '💰', target_per_week: 7 }
      ],
      trackings: {},
      mood: {}
    }
    localStorage.setItem(DB_KEY, JSON.stringify(seed))
    return seed
  }
  return JSON.parse(raw)
}

function writeDB(obj) {
  localStorage.setItem(DB_KEY, JSON.stringify(obj))
}

function daysInMonth(yearMonth) {
  const [y,m] = yearMonth.split('-').map(Number)
  return new Date(y, m, 0).getDate()
}

export const fakeApi = {
  async getHabits(userId = 'demo'){
    const db = readDB()
    return db.habits.filter(h => h.user_id === userId && !h.archived)
  },

  async createHabit(payload){
    const db = readDB()
    const id = 'h' + (Math.random().toString(36).slice(2,9))
    const newH = { id, ...payload }
    db.habits.push(newH)
    writeDB(db)
    return newH
  },

  async getTrackingsForMonth(yearMonth){
    const db = readDB()
    const result = {}
    const total = daysInMonth(yearMonth)
    for (let d = 1; d <= total; d++) {
      const dayStr = String(d).padStart(2,'0')
      const key = `${yearMonth}-${dayStr}`
      result[key] = db.trackings[key] ? { ...db.trackings[key] } : {}
    }
    return result
  },

  async toggleTracking({date, habitId}){
    const db = readDB()
    if (!db.trackings[date]) db.trackings[date] = {}
    const current = db.trackings[date][habitId]
    db.trackings[date][habitId] = current === 'done' ? 'not_done' : 'done'
    writeDB(db)
    return { ...db.trackings[date] }
  }
}

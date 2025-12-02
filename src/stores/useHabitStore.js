import create from 'zustand'
import { fakeApi } from '../api/fakeApi'

export const useHabitStore = create((set, get) => ({
  habits: [],
  trackings: {},
  month: new Date().toISOString().slice(0,7),
  loading: false,

  fetchHabits: async () => {
    set({ loading: true })
    const habits = await fakeApi.getHabits('demo')
    set({ habits, loading: false })
  },

  fetchTrackingsForMonth: async (month) => {
    set({ loading: true })
    const t = await fakeApi.getTrackingsForMonth(month)
    set({ trackings: t, loading: false })
  },

  toggleTracking: async ({date, habitId}) => {
    set(state => {
      const copy = { ...state.trackings }
      if (!copy[date]) copy[date] = {}
      copy[date][habitId] = copy[date][habitId] === 'done' ? 'not_done' : 'done'
      return { trackings: copy }
    })
    await fakeApi.toggleTracking({date, habitId})
  },

  createHabit: async (payload) => {
    const h = await fakeApi.createHabit(payload)
    set(state => ({ habits: [...state.habits, h] }))
  },

  updateHabit: async (id, updates) => {
    set(state => ({
      habits: state.habits.map(h => h.id === id ? { ...h, ...updates } : h)
    }))
    await fakeApi.updateHabit(id, updates)
  },

  deleteHabit: async (id) => {
    set(state => ({
      habits: state.habits.filter(h => h.id !== id)
    }))
    await fakeApi.deleteHabit(id)
  }
}))

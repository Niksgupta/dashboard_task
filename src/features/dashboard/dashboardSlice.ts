import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Widget {
  id: string
  type: 'weather' | 'crypto' | 'tasks'
  city?: string
  coin?: string
}

interface DashboardState {
  widgets: Widget[]
}


const initialState: DashboardState = {
  widgets: [
    { id: 'weather', type: 'weather', city: 'Pune' },
    { id: 'crypto', type: 'crypto', coin: 'bitcoin' },
    { id: 'tasks', type: 'tasks' },
  ],
}


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget(state, action: PayloadAction<Widget>) {
      state.widgets.push(action.payload)
    },
    removeWidget(state, action: PayloadAction<string>) {
      state.widgets = state.widgets.filter(w => w.id !== action.payload)
    },
    reorderWidgets(state, action: PayloadAction<Widget[]>) {
      state.widgets = action.payload
    },
  },
})

export const { addWidget, removeWidget, reorderWidgets } = dashboardSlice.actions
export default dashboardSlice.reducer

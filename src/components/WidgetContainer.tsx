import React, { Suspense, lazy, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { reorderWidgets, addWidget, removeWidget, type Widget } from '../features/dashboard/dashboardSlice'
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd'

// Lazy load all widgetstill weather and cyrpto api returns response 
const WeatherWidget = lazy(() => import('./widgets/WeatherWidget'))
const CryptoWidget = lazy(() => import('./widgets/CryptoWidget'))
const TaskListWidget = lazy(() => import('./widgets/TaskListWidget'))

const widgetComponents: Record<string, React.FC<any>> = {
  weather: WeatherWidget,
  crypto: CryptoWidget,
  tasks: TaskListWidget,
}

const availableWidgetTypes = [
  { type: 'weather', label: 'Weather' },
  { type: 'crypto', label: 'Crypto Price' },
  { type: 'tasks', label: 'Task List' },
] as const

type WidgetType = 'weather' | 'crypto' | 'tasks'

export default function WidgetContainer() {
  const widgets = useSelector((state: RootState) => state.dashboard.widgets)
  const dispatch = useDispatch()
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>(availableWidgetTypes[0].type)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const reordered = Array.from(widgets)
    const removed = reordered.splice(result.source.index, 1)[0]
    if (removed) {
      reordered.splice(result.destination.index, 0, removed)
      dispatch(reorderWidgets(reordered))
    }
  }

  const handleAddWidget = () => {
    const newWidgetID = `${selectedWidget}-${Date.now()}`
    let newWidget: Widget = { id: newWidgetID, type: selectedWidget }

    if (selectedWidget === 'weather') newWidget.city = 'Pune'
    if (selectedWidget === 'crypto') newWidget.coin = 'bitcoin'

    dispatch(addWidget(newWidget))
  }

  const handleRemoveWidget = (id: string) => {
    dispatch(removeWidget(id))
  }

  return (
    <>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <select value={selectedWidget} onChange={e => setSelectedWidget(e.target.value as WidgetType)}>
          {availableWidgetTypes.map(w => (
            <option value={w.type} key={w.type}>
              {w.label}
            </option>
          ))}
        </select>
        <button onClick={handleAddWidget}>Add Widget</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dashboard-widgets" direction="horizontal">
          {(provided) => (
            <div
              className="widget-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex', gap: '15px' }}
            >
              {widgets.map((w, index) => {
                const Widget = widgetComponents[w.type]!
                return (
                  <Draggable draggableId={w.id} index={index} key={w.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="widget-wrapper"
                        style={{ position: 'relative', ...provided.draggableProps.style }}
                      >
                        <button
                          onClick={() => handleRemoveWidget(w.id)}
                          style={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            background: '#ff6b6b',
                            border: 'none',
                            borderRadius: '50%',
                            color: 'white',
                            width: 24,
                            height: 24,
                            cursor: 'pointer',
                          }}
                          title="Remove widget"
                        >
                          &times;
                        </button>
                        <Suspense fallback={<div style={{ minWidth: 200 }}>Loading widgetsss</div>}>
                          <Widget {...w} />
                        </Suspense>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

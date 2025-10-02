import React, { useState, useEffect, type ChangeEvent, type KeyboardEvent, type FocusEvent } from 'react'
import { useDebounce } from '../../Utils/useDebounce'

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function TaskListWidget() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [taskInput, setTaskInput] = useState('')

  // Debounceing input 300 ms to update : custom hook i have made for reusablity 
  const debouncedInput = useDebounce(taskInput, 300)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!debouncedInput.trim()) return
    setTasks([...tasks, { id: Date.now(), text: debouncedInput, completed: false }])
    setTaskInput('')
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditingText(text)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingText('')
  }

  const saveEditing = () => {
    if (editingText.trim() === '') {
      cancelEditing()
      return
    }
    setTasks(tasks.map(t => (t.id === editingId ? { ...t, text: editingText } : t)))
    cancelEditing()
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value)
  }

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask()
  }

  const onEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value)
  }

  const onEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEditing()
    } else if (e.key === 'Escape') {
      cancelEditing()
    }
  }

  const onEditBlur = (e: FocusEvent<HTMLInputElement>) => {
    saveEditing()
  }

  return (
    <div className="widget task-widget">
      <h3>Task List</h3>
      <input
        value={taskInput}
        onChange={onInputChange}
        placeholder="Add new task"
        onKeyDown={onInputKeyDown}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? 'line-through' : undefined }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            {editingId === task.id ? (
              <input
                type="text"
                value={editingText}
                onChange={onEditChange}
                onKeyDown={onEditKeyDown}
                onBlur={onEditBlur}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => startEditing(task.id, task.text)} style={{ cursor: 'pointer' }}>
                {task.text}
              </span>
            )}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

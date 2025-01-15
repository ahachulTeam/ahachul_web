import { useState } from 'react'

import { TAB_STATE, TabState } from '@/data/todo'
import { Todo, todos as initialTodos } from '@/mocks/todo'

export default function useTodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [currentTab, setCurrentTab] = useState<TabState>(TAB_STATE.ALL)

  const addTodo = ({ content }: { content: string }) => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        content,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ])
  }

  const deleteTodo = ({ id }: { id: number }) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const editTodo = ({ id, content }: { id: number; content: string }) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, content } : todo)))
  }

  const toggleTodo = ({ id }: { id: number }) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }

  const toggleTodoAll = () => {
    const allCompleted = todos.every(todo => todo.completed)
    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    )
  }

  const deleteCompletedTodo = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  return {
    state: {
      todos,
      currentTab,
    },
    action: {
      addTodo,
      deleteTodo,
      editTodo,
      toggleTodo,
      toggleTodoAll,
      deleteCompletedTodo,
      setCurrentTab,
    },
  }
}

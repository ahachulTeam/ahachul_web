export interface Todo {
  id: number
  content: string
  completed: boolean
  createdAt: string
}

export const todos: Todo[] = [
  {
    id: 1,
    content: 'Learn React',
    completed: false,
    createdAt: '2024-01-11T12:00:00Z',
  },
  {
    id: 2,
    content: 'Build Todo App',
    completed: true,
    createdAt: '2024-01-11T13:00:00Z',
  },
  {
    id: 3,
    content: 'Write Tests',
    completed: false,
    createdAt: '2024-01-11T14:00:00Z',
  },
]

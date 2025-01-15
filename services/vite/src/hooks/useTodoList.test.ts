import { describe, it, expect } from 'vitest'

import { TAB_STATE } from '@/data/todo'
import { act, renderHook, waitFor } from '@/libs/test-utils'
import { todos as mockTodos } from '@/mocks/todo'

import useTodoList from './useTodoList'

describe('todo-list > hook', () => {
  it('투두를 추가할 수 있다.', async () => {
    // Given
    const { result } = renderHook(() => useTodoList())
    const content = '탕후루 먹기'

    // When
    act(() => {
      result.current.action.addTodo({ content })
    })

    // Then
    await waitFor(() => {
      const { todos } = result.current.state
      expect(todos![todos!.length - 1].content).toBe('탕후루 먹기')
    })
  })

  it('투두를 삭제할 수 있다.', async () => {
    // Given
    const { result } = renderHook(() => useTodoList())
    const id = mockTodos[0].id

    // When
    act(() => {
      result.current.action.deleteTodo({ id })
    })

    // Then
    await waitFor(() => {
      const { todos } = result.current.state
      expect(todos!.find(todo => todo.id === id)).toBeUndefined()
    })
  })

  it('투두를 수정할 수 있다.', async () => {
    // Given
    const { result } = renderHook(() => useTodoList())
    const id = mockTodos[0].id
    const content = '탕후루 먹기'

    // When
    act(() => {
      result.current.action.editTodo({ id, content })
    })

    // Then
    await waitFor(() => {
      const { todos } = result.current.state
      expect(todos!.find(todo => todo.id === id)?.content).toBe('탕후루 먹기')
    })
  })

  it('투두를 토글할 수 있다.', async () => {
    // Given
    const { result } = renderHook(() => useTodoList())
    const id = mockTodos[0].id
    const completed = mockTodos[0].completed

    // When
    act(() => {
      result.current.action.toggleTodo({ id })
    })

    // Then
    await waitFor(() => {
      const { todos } = result.current.state
      expect(todos!.find(todo => todo.id === id)?.completed).toBe(!completed)
    })
  })

  it('모든 투두를 토글할 수 있다.', async () => {
    // Given
    const { result } = renderHook(() => useTodoList())
    const completed = mockTodos.every(todo => todo.completed)

    // When
    act(() => {
      result.current.action.toggleTodoAll()
    })

    // Then
    await waitFor(() => {
      const { todos } = result.current.state
      expect(todos!.every(todo => todo.completed)).toBe(!completed)
    })
  })

  it('완료된 투두를 삭제할 수 있다.', async () => {
    // Given
    const { result } = renderHook(() => useTodoList())

    // When
    act(() => {
      result.current.action.deleteCompletedTodo()
    })

    // Then
    await waitFor(() => {
      const { todos } = result.current.state
      expect(todos!.filter(todo => todo.completed)).toHaveLength(0)
    })
  })

  it('현재 탭을 변경할 수 있다.', async () => {
    // Given
    const { result } = renderHook(() => useTodoList())

    // When
    act(() => {
      result.current.action.setCurrentTab(TAB_STATE.COMPLETED)
    })

    // Then
    await waitFor(() => {
      const { currentTab } = result.current.state
      expect(currentTab).toBe(TAB_STATE.COMPLETED)
    })
  })
})

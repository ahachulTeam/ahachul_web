import { render, screen, waitFor } from '@/libs/test-utils'
import { todos as mockTodos } from '@/mocks/todo'

import { TodoList } from './TodoList'

describe('todo-list > view ', () => {
  it('정상적으로 렌더링되어야 함', async () => {
    // Given
    // When
    render(<TodoList />)

    // Then
    await waitFor(() => {
      expect(screen.getByText(mockTodos[0].content)).toBeInTheDocument()
    })
  })
})

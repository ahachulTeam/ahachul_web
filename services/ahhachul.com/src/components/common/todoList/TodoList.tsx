import { todos as mockTodos } from '@/mocks/handlers/todo';

export function TodoList() {
  return (
    <ul>
      {mockTodos.map(todo => (
        <li key={todo.id}>{todo.content}</li>
      ))}
    </ul>
  );
}

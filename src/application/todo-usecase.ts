import type { FileRepository } from '../domain/file-interface.js';
import type { TodoUsecase } from '../domain/todo-interface.js';

export const implTodoUsecase = ({
  fileRepository,
}: {
  fileRepository: FileRepository;
}): TodoUsecase => ({
  addTodo: ({ content }) => {
    const result = fileRepository.readTodos();
    if (result.state === 'error') {
      return result;
    }
    const { data: todos } = result;
    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const newTodo = { id: newId, content, done: false };
    todos.push(newTodo);
    return fileRepository.writeTodos({ todos });
  },
  listTodos: () => {
    return fileRepository.readTodos();
  },
  doneTodo: ({ id }) => {
    const result = fileRepository.readTodos();
    if (result.state === 'error') {
      return result;
    }
    const { data: todos } = result;
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      return { state: 'error', detailedError: 'NOT_FOUND_ID_IN_DONE' };
    }
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    return fileRepository.writeTodos({ todos: updatedTodos });
  },
  deleteTodo: ({ id }) => {
    const result = fileRepository.readTodos();
    if (result.state === 'error') {
      return result;
    }
    const { data: todos } = result;
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      return { state: 'error', detailedError: 'NOT_FOUND_ID_IN_DELETE' };
    }
    const updatedTodos = todos.filter((t) => t.id !== id);
    const response = fileRepository.writeTodos({ todos: updatedTodos });
    if (response.state === 'error') {
      return response;
    }
    return {
      state: 'success',
      data: { id, removedContent: todo.content },
    };
  },
  updateTodo: ({ id, newContent }) => {
    const result = fileRepository.readTodos();
    if (result.state === 'error') {
      return result;
    }
    const { data: todos } = result;
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) {
      return { state: 'error', detailedError: 'NOT_FOUND_ID_IN_UPDATE' };
    }
    const oldContent = todo.content;
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, content: newContent } : t
    );
    const response = fileRepository.writeTodos({ todos: updatedTodos });
    if (response.state === 'error') {
      return response;
    }
    return {
      state: 'success',
      data: { id, oldContent, newContent },
    };
  },
});

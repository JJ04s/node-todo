import type { UseCaseResponseType } from '../domain/response-type.js';
import type { Todo } from './file-interface.js';

export type TodoUsecase = {
  addTodo: ({ content }: { content: string }) => UseCaseResponseType<void>;
  listTodos: () => UseCaseResponseType<Todo[]>;
  doneTodo: ({ id }: { id: number }) => UseCaseResponseType<void>;
  deleteTodo: ({
    id,
  }: {
    id: number;
  }) => UseCaseResponseType<{ id: number; removedContent: string }>;
  updateTodo: ({
    id,
    newContent,
  }: {
    id: number;
    newContent: string;
  }) => UseCaseResponseType<{
    id: number;
    newContent: string;
    oldContent: string;
  }>;
};

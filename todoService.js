export default function createTodoService(db) {
  return {
    addTodo({ content }) {
      db.todos.push({
        id: db.nextId++,
        content: content,
        done: false,
      });

      return {
        mutated: true,
        message: `Todo가 추가되었습니다: ${content}`,
      };
    },

    deleteTodo({ id: targetTodoId }) {
      const targetTodoIndex = db.todos.findIndex(
        (todo) => todo.id === targetTodoId,
      );

      if (targetTodoIndex === -1) {
        return {
          mutated: false,
          message: "해당 ID를 찾을 수 없습니다.",
        };
      }

      db.todos.splice(targetTodoIndex, 1);
      return {
        mutated: true,
        message: `ID ${targetTodoId}번 항목이 삭제되었습니다.`,
      };
    },

    updateTodo({ id: targetTodoId, content: updatedContent }) {
      const targetTodo = db.todos.find((todo) => todo.id === targetTodoId);

      if (targetTodo) {
        targetTodo.content = updatedContent;
        return {
          mutated: true,
          message: `ID ${targetTodoId}번 항목이 수정되었습니다.`,
        };
      } else {
        return {
          mutated: false,
          message: "해당 ID를 찾을 수 없습니다.",
        };
      }
    },

    completeTodo({ id: targetTodoId }) {
      const targetTodo = db.todos.find((todo) => todo.id === targetTodoId);

      if (targetTodo) {
        targetTodo.done = true;
        return {
          mutated: true,
          message: `ID ${targetTodoId}번 항목이 완료되었습니다.`,
        };
      } else {
        return {
          mutated: false,
          message: "해당 ID를 찾을 수 없습니다.",
        };
      }
    },

    showTodos() {
      if (db.todos.length === 0) {
        return {
          mutated: false,
          message: "Todo가 없습니다.",
        };
      }

      const todoList = db.todos
        .map((todo) => `[${todo.done ? "X" : " "}] ${todo.id}. ${todo.content}`)
        .join("\n");

      return {
        mutated: false,
        message: todoList,
      };
    },
  };
}

export default function createTodoService(db) {
  return {
    addTodo({ content }) {
      db.todos.push({
        id: db.nextId++,
        content: content,
        done: false,
      });

      console.log(`Todo가 추가되었습니다: ${content}`);
    },

    deleteTodo({ id: targetTodoId }) {
      db.todos = db.todos.filter((todo) => todo.id !== targetTodoId);
    },

    updateTodo({ id: targetTodoId, content: updatedContent }) {
      const targetTodo = db.todos.find((todo) => todo.id === targetTodoId);

      if (targetTodo) {
        targetTodo.content = updatedContent;
      } else {
        console.log("해당 ID를 찾을 수 없습니다.");
      }
    },

    completeTodo({ id: targetTodoId }) {
      const targetTodo = db.todos.find((todo) => todo.id === targetTodoId);

      if (targetTodo) {
        targetTodo.done = true;
      } else {
        console.log("해당 ID를 찾을 수 없습니다.");
      }
    },

    showTodos() {
      if (db.todos.length === 0) {
        console.log("Todo가 없습니다.");
        return;
      }

      const todoList = db.todos
        .map((todo) => `[${todo.done ? "X" : " "}] ${todo.id}. ${todo.content}`)
        .join("\n");

      console.log(todoList);
    },
  };
}

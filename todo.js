import fs from "node:fs";

const FILE_PATH = "todos.json";

const loadTodos = () => {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data);
};

const saveTodos = (todos) => {
  if (!Array.isArray(todos)) {
    throw new Error("Todos should be an array");
  }
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), "utf-8");
};

const addTodo = (content) => {
  const todos = loadTodos();
  const newTodo = {
    id: todos.length + 1,
    content,
    done: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  console.log(`Todo가 추가되었습니다: [${content}]`);
};

const listTodos = () => {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log("Todo가 없습니다.");
    return;
  }
  todos.forEach((todo) => {
    const checkbox = todo.done ? "[x]" : "[ ]";
    console.log(`${checkbox} ${todo.id}. ${todo.content}`);
  });
};

const markTodoAsDone = (id) => {
  const todos = loadTodos();
  const targetTodoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (targetTodoIndex === -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  todos[targetTodoIndex].done = true;
  saveTodos(todos);
  console.log(`ID [${id}]번 항목이 완료되었습니다.`);
};

const deleteTodo = (id) => {
  const todos = loadTodos();
  const targetTodoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (targetTodoIndex === -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  const removedTodo = todos.splice(targetTodoIndex, 1)[0];
  saveTodos(todos);
  console.log(`ID [${id}]번 항목이 삭제되었습니다: [${removedTodo.content}]`);
};

const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    // TODO: addTodo()
    break;
  case "list":
    listTodos();
    break;
  case "done":
    // TODO: markTodoAsDone()
    break;
  case "delete":
    // TODO: deleteTodo()
    break;
  default:
    console.log("Unknown command. Use 'add', 'list', 'done', or 'delete'.");
}

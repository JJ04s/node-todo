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
  console.log(`Todo가 추가되었습니다: [${title}]`);
};

const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    // TODO: addTodo()
    break;
  case "list":
    // TODO: listTodos()
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

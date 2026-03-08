import fs from "node:fs";

const FILE_PATH = "todos.json";

function loadTodos() {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data);
}

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

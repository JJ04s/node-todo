import fs from "fs";

const [, , command, ...args] = process.argv;

const data = fs.readFileSync("todos.json", "utf8");
const todos = JSON.parse(data);

const commandHandler = {
  add: addTodo,
  delete: deleteTodo,
  update: updateTodo,
  done: completeTodo,
  list: showTodos,
};

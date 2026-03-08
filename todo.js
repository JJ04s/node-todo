import fs from "fs";
import createTodoService from "./todoService.js";
import argParser from "./argParser.js";

const [, , command, ...args] = process.argv;

let db;
try {
  db = JSON.parse(fs.readFileSync("todos.json", "utf8"));
} catch {
  db = { nextId: 1, todos: [] };
}

const todoService = createTodoService(db);
const commandHandler = {
  add: todoService.addTodo,
  delete: todoService.deleteTodo,
  update: todoService.updateTodo,
  done: todoService.completeTodo,
  list: todoService.showTodos,
};

const handler = commandHandler[command];
if (!handler) {
  console.log("알 수 없는 command입니다.");
  process.exit(1);
}

const result = handler(argParser(command, args));
if (result.mutated) {
  try {
    fs.writeFileSync("todos.json", JSON.stringify(db, null, 2));
    console.log(result.message);
  } catch {
    console.log("알 수 없는 오류가 발생했습니다.");
  }
} else {
  console.log(result.message);
}

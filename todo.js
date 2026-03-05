import fs from "fs";

const [, , command, ...args] = process.argv;

const data = fs.readFileSync("todos.json", "utf8");
const db = JSON.parse(data);

const commandHandler = {
  add: addTodo,
  delete: deleteTodo,
  update: updateTodo,
  done: completeTodo,
  list: showTodos,
};

function argParser(command, args) {
  const parsedArgs = {};

  switch (command) {
    case "add":
      parsedArgs.content = args.join(" ");
      break;
    case "delete":
      parsedArgs.id = Number(args[0]);
      break;
    case "update":
      const [id, ...content] = args;
      parsedArgs.id = Number(id);
      parsedArgs.content = content.join(" ");
      break;
    case "done":
      parsedArgs.id = Number(args[0]);
      break;
    case "list":
      break;
    default:
      console.log("알 수 없는 command입니다.");
  }

  return parsedArgs;
}

const handler = commandHandler[command];
handler(argParser(command, args));
fs.writeFileSync("todos.json", JSON.stringify(db, null, 2));

function addTodo({ content }) {
  db.todos.push({
    id: db.nextId++,
    content: content,
    done: false,
  });

  console.log(`Todo가 추가되었습니다: ${content}`);
}

function deleteTodo({ id: targetTodoId }) {
  db.todos = db.todos.filter((todo) => todo.id !== targetTodoId);
}

function updateTodo({ id: targetTodoId, content: updatedContent }) {
  const targetTodo = db.todos.find((todo) => todo.id === targetTodoId);

  if (targetTodo) {
    targetTodo.content = updatedContent;
  } else {
    console.log("해당 ID를 찾을 수 없습니다.");
  }
}

function completeTodo({ id: targetTodoId }) {
  const targetTodo = db.todos.find((todo) => todo.id === targetTodoId);

  if (targetTodo) {
    targetTodo.done = true;
  } else {
    console.log("해당 ID를 찾을 수 없습니다.");
  }
}

function showTodos() {
  if (db.todos.length === 0) {
    console.log("Todo가 없습니다.");
    return;
  }

  const todoList = db.todos
    .map((todo) => `[${todo.done ? "X" : " "}] ${todo.id}. ${todo.content}`)
    .join("\n");

  console.log(todoList);
}

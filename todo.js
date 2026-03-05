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


const path = require('path');
const fs = require('fs');
const FILE = path.join(__dirname, 'todos.json');

function add_todo(content) {

  if (!content) {
    console.log("할 일 내용을 입력하세요.");
    return;
  }

  let todos = [];

  if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE, 'utf8');
    todos = JSON.parse(data);
  }

  const newId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;

  const newTodo = {
    id: newId,
    content: content,
    done: false
  };

  todos.push(newTodo);

  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));

  console.log(`Todo가 추가되었습니다: ${content}`);
}

function list_todos() {

  if (!fs.existsSync(FILE)) {
    console.log("Todo가 없습니다.");
    return;
  }

  const data = fs.readFileSync(FILE, 'utf8');
  const todos = JSON.parse(data);

  if (todos.length === 0) {
    console.log("Todo가 없습니다.");
    return;
  }

  for (const todo of todos) {
    const mark = todo.done ? "[x]" : "[ ]";
    console.log(`${mark} ${todo.id}. ${todo.content}`);
  }

}

function done_todo(id) {

}

function delete_todo(id) {

}

function update_todo(id, new_content) {

}

function print_usage() {

}


function main() {
  const command = process.argv[2];

  switch (command) {
    case 'add': {
      add_todo(process.argv[3]);
      break;
    }
    case 'list': {
      list_todos();
      break;
    }
    case 'done': {
      done_todo(process.argv[3]);
      break;
    }
    case 'delete': {
      delete_todo(process.argv[3]);
      break;
    }
    case 'update': {
      update_todo(process.argv[3],process.argv[4]);
      break;
    }
    default: {
      print_usage();
    }
  }
}

main();
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

function update_todo(id, new_content) {

  if (!new_content) {
    console.log("새 내용을 입력해주세요.");
    return;
  }

  if (!fs.existsSync(FILE)) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  const data = fs.readFileSync(FILE, 'utf8');
  const todos = JSON.parse(data);

  const numericId = Number(id);
  let found = false;

  for (const todo of todos) {
    if (todo.id === numericId) {
      todo.content = new_content;
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
  console.log(`ID ${numericId}번 항목이 수정되었습니다.`);
}


function done_todo(id) {

  if (!fs.existsSync(FILE)) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  const data = fs.readFileSync(FILE, 'utf8');
  const todos = JSON.parse(data);

  const numericId = Number(id);
  let found = false;

  for (const todo of todos) {
    if (todo.id === numericId) {
      todo.done = true;
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
  console.log(`ID ${numericId}번 항목이 완료되었습니다.`);
}

function delete_todo(id) {

  if (!fs.existsSync(FILE)) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  const data = fs.readFileSync(FILE, 'utf8');
  const todos = JSON.parse(data);

  const numericId = Number(id);
  const newTodos = [];
  let found = false;

  for (const todo of todos) {
    if (todo.id === numericId) {
      found = true;
      continue;
    }
    newTodos.push(todo);
  }

  if (!found) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }

  fs.writeFileSync(FILE, JSON.stringify(newTodos, null, 2));
  console.log(`ID ${numericId}번 항목이 삭제되었습니다.`);
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
      //
    }
  }
}

main();
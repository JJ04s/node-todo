const fs = require('fs');
const path = require('path');

const TODOS_FILE = path.join(__dirname, 'todos.json');

function readTodos() {
  if (!fs.existsSync(TODOS_FILE)) {
    return [];
  }

  const raw = fs.readFileSync(TODOS_FILE, 'utf8');
  if (!raw.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('todos.json 파일 형식이 올바르지 않습니다.');
    process.exit(1);
  }
}

function writeTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

function getNextId(todos) {
  if (todos.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todos.map((todo) => todo.id));
  return maxId + 1;
}

function addTodo(content) {
  if (!content.trim()) {
    console.error('추가할 Todo 내용을 입력하세요.');
    process.exit(1);
  }

  const todos = readTodos();
  const newTodo = {
    id: getNextId(todos),
    content: content.trim(),
    done: false,
  };

  todos.push(newTodo);
  writeTodos(todos);

  console.log(`Todo가 추가되었습니다: ${newTodo.content}`);
}

function listTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log('Todo가 없습니다.');
    return;
  }

  todos.forEach((todo) => {
    const status = todo.done ? '[x]' : '[ ]';
    console.log(`${status} ${todo.id}. ${todo.content}`);
  });
}

function doneTodo(id) {
  const todoId = Number(id);
  const todos = readTodos();
  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    console.log('해당 ID를 찾을 수 없습니다.');
    return;
  }

  todo.done = true;
  writeTodos(todos);
  console.log(`ID ${todoId}번 항목이 완료되었습니다.`);
}

function deleteTodo(id) {
  const todoId = Number(id);
  const todos = readTodos();
  const targetIndex = todos.findIndex((item) => item.id === todoId);

  if (targetIndex === -1) {
    console.log('해당 ID를 찾을 수 없습니다.');
    return;
  }

  todos.splice(targetIndex, 1);
  writeTodos(todos);
  console.log(`ID ${todoId}번 항목이 삭제되었습니다.`);
}

function updateTodo(id, newContent) {
  const todoId = Number(id);
  const todos = readTodos();
  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    console.log('해당 ID를 찾을 수 없습니다.');
    return;
  }

  if (!newContent || !newContent.trim()) {
    console.log('새 내용을 입력하세요.');
    return;
  }

  todo.content = newContent.trim();
  writeTodos(todos);
  console.log(`ID ${todoId}번 항목이 수정되었습니다.`);
}

function main() {
  const [, , command, ...args] = process.argv;

  if (command === 'add') {
    addTodo(args.join(' '));
    return;
  }

  if (command === 'list') {
    listTodos();
    return;
  }

  if (command === 'done') {
    doneTodo(args[0]);
    return;
  }

  if (command === 'delete') {
    deleteTodo(args[0]);
    return;
  }

  if (command === 'update') {
    updateTodo(args[0], args.slice(1).join(' '));
    return;
  }
}

main();

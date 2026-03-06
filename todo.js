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

function main() {
  const [, , command, ...args] = process.argv;

  if (command === 'add') {
    addTodo(args.join(' '));
    return;
  }
}

main();

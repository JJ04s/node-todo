const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
    console.error('todos.json 파일에 문제가 있습니다.');
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
    console.log('수정할 Todo 내용을 입력하세요.');
    return;
  }

  todo.content = newContent.trim();
  writeTodos(todos);
  console.log(`ID ${todoId}번 항목이 수정되었습니다.`);
}

function clearTodos() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Todo 목록을 초기화하시겠습니까? [y/n] ', (answer) => {
    if (answer.trim().toLowerCase() === 'y') {
      writeTodos([]);
      console.log('Todo 목록이 초기화되었습니다.');
    } else {
      console.log('Todo 목록 초기화를 취소했습니다.');
    }
    rl.close();
  });
}

function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case 'add':
      addTodo(args.join(' '));
      return;
    case 'list':
      listTodos();
      return;
    case 'done':
      doneTodo(args[0]);
      return;
    case 'delete':
      deleteTodo(args[0]);
      return;
    case 'update':
      updateTodo(args[0], args.slice(1).join(' '));
      return;
    case 'clear':
      clearTodos();
      return;
    default:
      return;
  }
}

main();

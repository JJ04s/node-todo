const fs = require('fs');
const FILE_NAME = 'todos.json';

function loadTodos() {
  try {
    if (!fs.existsSync(FILE_NAME)) {
      return [];
    }
    const data = fs.readFileSync(FILE_NAME, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("파일을 읽는 중 오류가 발생했습니다.", error.message);
    return [];
  }
}

function saveTodos(todos) {
  try {
    fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2), 'utf8');
  } catch (error) {
    console.error("파일을 저장하는 중 오류가 발생했습니다.", error.message);
  }
}

function addTodo(content) {
  const todos = loadTodos();
  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  
  todos.push({ id: newId, content: content, done: false });
  saveTodos(todos);
  console.log(`Todo가 추가되었습니다: ${content}`);
}

function listTodos() {
  const todos = loadTodos();
  
  if (todos.length === 0) {
    console.log("Todo가 없습니다.");
    return;
  }
  
  todos.forEach(todo => {
    const mark = todo.done ? '[x]' : '[ ]';
    console.log(`${mark} ${todo.id}. ${todo.content}`);
  });
}

function doneTodo(id) {
  const todos = loadTodos();
  const targetId = parseInt(id, 10);
  
  const todo = todos.find(t => t.id === targetId);
  
  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  
  todo.done = true;
  saveTodos(todos);
  console.log(`ID ${targetId}번 항목이 완료되었습니다.`);
}

function deleteTodo(id) {
  const targetId = parseInt(id, 10);
  let todos = loadTodos();
  const initialLength = todos.length;
  
  todos = todos.filter(todo => todo.id !== targetId);
  
  if (todos.length === initialLength) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  
  saveTodos(todos);
  console.log(`ID ${targetId}번 항목이 삭제되었습니다.`);
}

function updateTodo(id, newContent) {
  const todos = loadTodos();
  const targetId = parseInt(id, 10);
  
  const todo = todos.find(t => t.id === targetId);
  
  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  
  todo.content = newContent;
  saveTodos(todos);
  console.log(`ID ${targetId}번 항목의 내용이 변경되었습니다.`);
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    if (args[1]) addTodo(args[1]);
    else console.log("내용을 입력해주세요. 예) node todo.js add \"장보기\"");
    break;
  case 'list':
    listTodos();
    break;
  case 'done':
    if (args[1]) doneTodo(args[1]);
    else console.log("ID를 입력해주세요. 예) node todo.js done 1");
    break;
  case 'delete':
    if (args[1]) deleteTodo(args[1]);
    else console.log("ID를 입력해주세요. 예) node todo.js delete 1");
    break;
  case 'update':
    if (args[1] && args[2]) updateTodo(args[1], args[2]);
    else console.log("ID와 변경할 내용을 입력해주세요. 예) node todo.js update 1 \"새 내용\"");
    break;
  default:
    console.log("지원하지 않는 명령어입니다. 지원 명령어: add, list, done, delete, update");
}
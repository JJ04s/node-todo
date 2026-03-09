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
  if (!content) {
    console.log("할 일 내용을 입력해주세요.");
    return;
  }
  
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
  const targetId = parseInt(id, 10);
  const todos = loadTodos();
  const index = todos.findIndex(todo => todo.id === targetId);
  
  if (index === -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  
  todos[index].done = true;
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
  const targetId = parseInt(id, 10);
  if (!newContent) {
    console.log("새 내용을 입력해주세요.");
    return;
  }

  const todos = loadTodos();
  const index = todos.findIndex(todo => todo.id === targetId);
  
  if (index === -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  
  todos[index].content = newContent;
  saveTodos(todos);
  console.log(`ID ${targetId}번 항목이 수정되었습니다.`);
}

function main() {
  const command = process.argv[2];
  const arg1 = process.argv[3];
  const arg2 = process.argv[4];

  switch (command) {
    case 'add':
      addTodo(arg1);
      break;
    case 'list':
      listTodos();
      break;
    case 'done':
      doneTodo(arg1);
      break;
    case 'delete':
      deleteTodo(arg1);
      break;
    case 'update':
      updateTodo(arg1, arg2);
      break;
    default:
      console.log("사용 가능한 명령어: add, list, done, delete, update");
      break;
  }
}

main();
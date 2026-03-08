// todo.js
const fs = require('fs');
const FILE_NAME = 'todos.json';

// Read data from JSON file
function loadTodos() {
  if (!fs.existsSync(FILE_NAME)) {
    return [];
  }
  try {
    const data = fs.readFileSync(FILE_NAME, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write data to JSON file
function saveTodos(todos) {
  fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2), 'utf8');
}

// Add a new todo
function addTodo(content) {
  const todos = loadTodos();
  
  // Calculate new ID based on the max ID in the array
  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  
  const newTodo = {
    id: newId,
    content: content,
    done: false
  };
  
  todos.push(newTodo);
  saveTodos(todos);
  console.log(`Todo가 추가되었습니다: ${content}`);
}

// Print all todos
function listTodos() {
  const todos = loadTodos();
  
  if (todos.length === 0) {
    console.log("Todo가 없습니다.");
    return;
  }
  
  todos.forEach(todo => {
    // Check status and format output
    const statusBox = todo.done ? '[x]' : '[ ]';
    console.log(`${statusBox} ${todo.id}. ${todo.content}`);
  });
}

// Mark a todo as completed
function doneTodo(id) {
  const todos = loadTodos();
  const targetId = parseInt(id, 10);
  
  // Find the target todo by ID
  const todo = todos.find(t => t.id === targetId);
  
  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  
  todo.done = true;
  saveTodos(todos);
  console.log(`ID ${targetId}번 항목이 완료되었습니다.`);
}

// Delete a todo
function deleteTodo(id) {
  let todos = loadTodos();
  const targetId = parseInt(id, 10);
  const initialLength = todos.length;
  
  todos = todos.filter(t => t.id !== targetId);
  
  if (todos.length === initialLength) {
    console.log("해당 ID를 찾을 수 없습니다.");
    return;
  }
  
  saveTodos(todos);
  console.log(`ID ${targetId}번 항목이 삭제되었습니다.`);
}

// Update todo content
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

// CLI Command Router
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
    console.log("지원하지 않는 명령어입니다. (add, list, done, delete, update)");
}
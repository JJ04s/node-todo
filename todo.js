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
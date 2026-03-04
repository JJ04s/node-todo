// todo.js (Step 1)
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
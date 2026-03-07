const fs = require('fs');
const command = process.argv[2];
const param = process.argv[3];

function readTodos() {
    const data = fs.readFileSync('todos.json', 'utf8');
    return JSON.parse(data);
}

function listTodos() {
    const todos = readTodos();

    if (todos.length === 0) {
        console.log("Todo가 없습니다.");
        return;
    }

    todos.forEach(todo => {
        const status = todo.done ? "[x]" : "[]";
        console.log(`${status} ${todo.id}. ${todo.content}`);
    });
}

switch (command) {
    case 'list':
        listTodos();
        break;
    default:
        console.log("wrong command");
}

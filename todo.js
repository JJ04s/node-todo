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

function addTodo(content) {
    if (!content) {
        console.log("할 일 내용을 입력해주세요.");
        return;
    }

    const todos = readTodos();
    const nextID = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    const newTodo = {
        id: nextID,
        content: content,
        done: false
    };

    todos.push(newTodo);

    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
    console.log("Todo가 추가되었습니다:", content);
}

switch (command) {
    case 'list':
        listTodos();
        break;
    case 'add':
        addTodo(param);
        break;
    default:
        console.log("wrong command");
}
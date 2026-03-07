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

function doneTodo(id) {
    const targetID = parseInt(id);
    const todos = readTodos();
    const todo = todos.find(item => item.id == targetID);

    if (!todo) {
        console.log("해당 ID를 찾을 수 없습니다");
        return;
    }

    todo.done = true;
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));

    console.log(`ID ${targetID}번 항목이 완료되었습니다.`);
}

switch (command) {
    case 'list':
        listTodos();
        break;
    case 'add':
        addTodo(param);
        break;
    case 'done':
        doneTodo(param);
        break;
    default:
        console.log("wrong command");
}
import fs from 'node:fs';

const FILE_PATH = 'todos.json';

function loadTodos() {
    if (!fs.existsSync(FILE_PATH)) return [];
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(raw);
}

function saveTodos(todos) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
}

function addTodo(content) {
    const todos = loadTodos();
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    todos.push({ id, content, done: false });
    saveTodos(todos);
    console.log(`Todo가 추가되었습니다: ${content}`);
}

function listTodos() {
    const todos = loadTodos();
    if (todos.length === 0) {
        console.log('Todo가 없습니다.');
        return;
    }
    todos.forEach(todo => {
        const mark = todo.done ? '[x]' : '[ ]';
        console.log(`${mark} ${todo.id}. ${todo.content}`);
    });
}

function doneTodo(id) {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        console.log('해당 ID를 찾을 수 없습니다.');
        return;
    }
    todo.done = true;
    saveTodos(todos);
    console.log(`ID ${id}번 항목이 완료되었습니다.`);
}

function deleteTodo(id) {
    const todos = loadTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        console.log('해당 ID를 찾을 수 없습니다.');
        return;
    }
    todos.splice(index, 1);
    saveTodos(todos);
    console.log(`ID ${id}번 항목이 삭제되었습니다.`);
}

function updateTodo(id, newContent) {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        console.log('해당 ID를 찾을 수 없습니다.');
        return;
    }
    todo.content = newContent;
    saveTodos(todos);
    console.log(`ID ${id}번 항목이 수정되었습니다.`);
}

const [,, command, arg1, arg2] = process.argv;

if (command === 'add') {
    addTodo(arg1);
} else if (command === 'list') {
    listTodos();
} else if (command === 'done') {
    doneTodo(Number(arg1));
} else if (command === 'delete') {
    deleteTodo(Number(arg1));
} else if (command === 'update') {
    updateTodo(Number(arg1), arg2);
} else {
    console.log('사용법: node todo.js [add|list|done|delete|update] [인수]');
}

import fs from 'node:fs';
const FILE_NAME = 'todo.json';

function getTodos() {
    try {
        const data = fs.readFileSync(FILE_NAME, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveTodos(todos) {
    fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2), 'utf-8');
}

// 기능 함수

function addTodo(content) {
    const todos = getTodos();

    let newId = 1;
    if (todos.length > 0) {
        const lastTodo = todos[todos.length - 1];
        newId = lastTodo.id + 1;
    }

    const newTodo = {
        id: newId,
        content: content,
        done: false
    };

    todos.push(newTodo);
    saveTodos(todos);
    console.log(`Todo가 추가되었습니다: "${content}"`);
}   

const command = process.argv[2];
const argument = process.argv[3];
if (command === 'add') {
    if (!argument) {
        console.log('추가할 내용을 입력해주세요. 예: node todo.js add "할 일"');
    } else {
        addTodo(argument);
    }
} else {
    console.log('알 수 없는 명령어입니다. 현재 지원되는 명령어: add');
}
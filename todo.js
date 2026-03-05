import fs from 'node:fs';
const FILE_NAME = 'todos.json';

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

function listTodos() {
    const todos = getTodos();
    if (todos.length === 0) {
        console.log("Todo가 없습니다.");
        return;
    }

    todos.forEach((todo) => {
        const status = todo.done ? '[x]' : '[ ]';

        console.log(`${status} ${todo.id}. ${todo.content}`);
    });
}

function doneTodo(id) {
    const todos = getTodos();
    const todo = todos.find((item) => item.id === Number(id));

    if(!todo) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    }

    todo.done = true;
    saveTodos(todos);
    console.log(`ID ${id}번 항목이 완료되었습니다.`);
}

function deleteTodo(id) {
    const todos = getTodos();
    const newTodos = todos.filter((item) => item.id !== Number(id));

    if (todos.length === newTodos.length) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    }

    saveTodos(newTodos);
    console.log(`ID ${id}번 항목이 삭제되었습니다.`);
}
// 명령어 처리

const command = process.argv[2];
const argument = process.argv[3];
if (command === 'add') {
    if (!argument) {
        console.log('추가할 내용을 입력해주세요. 예: node todo.js add "할 일"');
    } else {
        addTodo(argument);
    }
} else if (command === 'list') {
    listTodos();
} else if (command === 'done') {
    if (!argument) {
        console.log('완료 처리할할 ID를 입력해주세요. 예: node todo.js done 1');
    } else {
        doneTodo(argument);
    }
} else if (command === 'delete') {
    if (!argument) {
        console.log('삭제할 ID를 입력해주세요. 예: node todo.js delete 1');
    } else {
        deleteTodo(argument);
    }
} else {
    console.log('알 수 없는 명령어입니다. 현재 지원되는 명령어: add, list, done');
}
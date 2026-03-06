// 2023-13751 자유전공학부 김하람

import fs from 'node:fs';


const filePath = 'todos.json';
const todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

/* 
사용자 입력을 받기 위한 방법으로 process 사용

process에서 사용자 입력을 받는 방법은 대표적으로 
1. process.stdin
- 프로그램을 실행 한 뒤 사용자로부터 입력을 받음
- ex) node todo.js -> 엔터 -> 사용자 입력
2. process.argv
- 프로그램을 실행할 때 명령어 뒤에 입력한 값을 받음
- ex) node todo.js "할 일" -> "할 일"이 입력값으로 전달

이번 과제에선 명령어가 node todo.js 이후에 입력되는 형식이므로 argv 사용
*/

/* 
process.argv는 배열 형태로 입력을 받음
- process.argv[0] : node 실행 경로
- process.argv[1] : 현재 파일 경로
- process.argv[2] : 사용자 입력값

사용자의 입력을 공백에 따라 나누어 저장할 경우 slice를 사용
*/

const input = process.argv.slice(2);
const command = input[0];

let id = todos.length > 0 ? todos.length : 1;

switch (command) {
    case 'add':
        const task = input.slice(1).join(' ');
        addTodo(task);
        break;
    case 'list':
        listTodos();
        break;
    case 'done':
        const id = input[1];
        done(id);
        break;

}

// 할 일 추가 함수
function addTodo(task) {
    todos.push({
        id: ++id,
        content: task,
        done: false
    });
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

// 할 일 목록 출력 함수
function listTodos() {
    if (todos.length === 0) {
        console.log("Todo가 없습니다.");
        return;
    } else {
        const printedTodos = todos.map((todo) => formatTodo(todo));
        console.log(printedTodos.join('\n'));
    }
}

// 목록 출력 시 포맷팅 함수
function formatTodo(todo) {
    return `[${todo.done ? ' ' : 'x'}] ${todo.id}. ${todo.content}`;
}

// 완료 함수
function done(id) {
    const index = todos.findIndex((todo) => todo.id === parseInt(id));
    // 사용자의 입력은 항상 문자열이지만
    // JSON.parse 에선 속성의 값이 숫자일 경우, 알아서 int로 변환한다. 

    if (index === -1) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    } else {
        todos[index].done = true;
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
        console.log(`ID ${id}번 항목이 완료되었습니다.`);
        return;
    }
}
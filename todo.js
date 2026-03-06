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
        addTask(task);
        break;
}

// 할 일 추가 함수
function addTask(task) {
    todos.push({
        id: ++id,
        content: task,
        done: false
    });
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}
import fs from 'node:fs'; // 파일 제어 도구 불러오기

const task = "Node.js 공부하기";

// 1. 할 일을 todo.txt 파일에 저장 (쓰기)
fs.writeFileSync('todo.txt', task);
console.log('할 일이 저장되었다.');

// 2. 저장된 내용을 읽어오기 (읽기)
const data = fs.readFileSync('todo.txt', 'utf-8');
console.log('파일에서 읽은 할 일:', data);
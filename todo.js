import fs from 'node:fs'; // 파일 제어 도구 불러오기

const args = process.argv;
const command = args[2];
const text = args[3];
let id = 1;

let todos = [];
if (fs.existsSync('todos.json')) {
    const data = fs.readFileSync('todos.json', 'utf-8');
    todos = JSON.parse(data);
}
if (command === 'add') {
    const newTodo = {
        id: id++, content : text, done : false
    };
    todos.push(newTodo);

    fs.writeFileSync('todos.json', JSON.stringify(todos));
    console.log('Todo가 추가되었습니다: ['+text+']');
}
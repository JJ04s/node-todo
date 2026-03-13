import fs, { existsSync } from 'node:fs';

const file = 'todo.json';

if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
}

const command = process.argv[2];
const todos = JSON.parse(fs.readFileSync(file));

if (command === 'add') {

    const content = process.argv.slice(3).join(" ");

    const newTodo = {
        id: todos.length + 1,
        text: content,
        completed: false
    };

    todos.push(newTodo);

    fs.writeFileSync(file, JSON.stringify(todos, null, 2));

    console.log(`Todo 추가 완료: ${content}`);
}

if (command === 'list') {
    
    if (todos.length === 0) {
        console.log('Todo가 없습니다.');
        process.exit();
    }

    todos.forEach(todo => {
        const mark = todo.completed ? "[X]" : "[ ]";
        console.log(`${mark} ${todo.id}. ${todo.text}`);
    });
}

if (command == 'done') {
    const id = Number(process.argv[3]);

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        console.log("해당 ID를 찾을 수 없습니다.");
        process.exit();
    }

    todo.completed = true;

    fs.writeFileSync(file, JSON.stringify(todos, null, 2));

    console.log(`ID ${id}번 항목이 완료되었습니다.`);
}
import fs from 'node:fs';
import { get } from 'node:http';
import { todo } from 'node:test';

const FILE_TODO = 'todo.json'

const args = process.argv.slice(2);
const command = args[0];

if (!fs.existsSync(FILE_TODO)) {
    fs.writeFileSync(FILE_TODO, JSON.stringify([]));
    console.log('Created todo.js')
}

const getData = () => {
    const data = fs.readFileSync(FILE_TODO, 'utf-8');
    return JSON.parse(data)
};

if (command === 'add') {
    const task = args.slice(1).join('');
    if (!task) {
        console.log('No task provided.');
        process.exit(1);
    }
    const fileJson = getData();
    const newId = (fileJson.length > 0 ? Math.max(...fileJson.map(t => t.id)) : 0) + 1; 

    const newTask = {
        id: newId,
        content: task,
        done: false
    };

    fileJson.push(newTask);
    fs.writeFileSync(FILE_TODO, JSON.stringify(fileJson, null, 2));
    
    console.log(`Added: "${task}" (ID: ${newId})`);
}

if (command === 'list') {
    const fileJson = getData();

    if (fileJson.length ===0 ) {
        console.log('TODO list is empty.');
    } else {
        console.log('<< TODO list >>');
        fileJson.forEach(todo => {
            const status = todo.done ? '[X]' : '[ ]';
            console.log(`${status} ${todo.id}. ${todo.content}`);
        });
    }
}

if (command === 'done') {    
    const targetId = parseInt(args[1]);
    
    if (!targetId) {
        console.log('No task ID provided.');
        process.exit(1);
    }

    const fileJson = getData();
    const target = fileJson.find(t => t.id === targetId);

    if (!target) {
        console.log(`Task ID${targetId} not found`);
    } else {
        target.done = true;
        fs.writeFileSync(FILE_TODO, JSON.stringify(fileJson, null, 2));
        console.log(`Task ${target.id}: "${target.content}" done.`);
    }
}
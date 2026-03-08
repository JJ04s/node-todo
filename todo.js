import fs from 'node:fs';

const FILE_TODO = 'todo.json'

const args = process.argv.slice(2);
const command = args[0];
const task = args.slice(1).join('');

if (!fs.existsSync(FILE_TODO)) {
    fs.writeFileSync(FILE_TODO, JSON.stringify([]));
    console.log('Created todo.js')
}

if (command === 'add') {
    if (!task) {
        console.log('No task provided.');
        process.exit(1);
    }
    const fileData = fs.readFileSync(FILE_TODO, 'utf-8');
    const fileJson = JSON.parse(fileData);

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
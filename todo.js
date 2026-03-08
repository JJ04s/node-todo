const fs = require('fs');



function addTodo(Content){

    if(!Content){
        console.log('에러 : 할 일을 추가하세요');
        return;
    }

    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);

    const newID = todos.length > 0 ? todos[todos.length-1].id + 1 : 1;

    todos.push({id: newID, content : Content, done : false});

    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));

    console.log(`Todo가 추가되었습니다: [${Content}]`);
    return;
}

function listTodo() {
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);

    if (todos.length === 0) {
        console.log("Todo가 없습니다.");
        return;
    }

    todos.forEach(todo => {
        const status = todo.done ? "[x]" : "[ ]";
        
        console.log(`${status} ${todo.id}. ${todo.content}`);
    });
}

function doneTodo(id){
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);
    if(id > todos.length){
        console.log('해당 ID를 찾을 수 없습니다');
        return;
    }

    for (const todo of todos) {
        if (todo.id === Number(id)) {
            todo.done = true;
            found = true;
            break;
        }
    }

    console.log(`ID ${id}번 항목이 완료되었습니다.`);

}

function deleteTodo(id) {
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);
    
    const filteredTodos = todos.filter(todo => todo.id !== Number(id));

    if (todos.length === filteredTodos.length) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    }

    count = 1;
    for (const todo of filteredTodos) {
        todo.id = count;
        count ++;
    }

    fs.writeFileSync('todos.json', JSON.stringify(filteredTodos, null, 2));

    console.log(`ID ${id}번 항목이 삭제되었습니다.`);
}

function updateTodo(id, newContent) {
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);

    let isUpdated = false;

    const updatedTodos = todos.map(todo => {
        if (todo.id === Number(id)) {
            isUpdated = true;
            return { ...todo, content: newContent };
        }
        return todo;
    });

    if (!isUpdated) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    }

    fs.writeFileSync('todos.json', JSON.stringify(updatedTodos, null, 2));
    console.log(`ID ${id}번 항목의 내용이 수정되었습니다.`);
}

function main(){
    const command = process.argv[2]; const content = process.argv[3];
    switch (command){
        case 'add' :{
            addTodo(content);
            break;
        }

        case 'list' :{
            listTodo();
            break;
        }

        case 'done' :{
            doneTodo(content);
            break;
        }

        case 'delete' :{
            deleteTodo(content);
            break;
        }

        case 'update' :{
            updateTodo(content, process.argv[4]);
        }
        default:{

        }
    }
}

main();
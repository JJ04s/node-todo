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

function doneTodo(){

}

function deleteTodo(){

}

function updateTodo(){

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
            
        }

        case 'delete' :{

        }

        case 'update' :{

        }
        default:{

        }
    }
}

main();
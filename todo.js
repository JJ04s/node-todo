const fs = require('fs');



function addTodo(Content){
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);

    const newID = todos.length > 0 ? todos[todos.length-1].id + 1 : 1;

    todos.push({id: newID, content : Content, done : false});

    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
}

function listTodo(){

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
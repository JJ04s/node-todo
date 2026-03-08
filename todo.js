const fs = require('fs');



function addTodo(newContent){
    const data = fs.readFileSync('todos.json', 'utf8');
    const todos = JSON.parse(data);

    const 
}

function main(){
    const command = process.argv[2]; const content = process.argv[3];
    switch (command){
        case 'add' :{

        }

        case 'list' :{
            
        }

        case 'done' :{
            
        }

        case 'delete' :{

        }

        case 'update' :{

        }
    }
}

main();
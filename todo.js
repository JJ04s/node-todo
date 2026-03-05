const fs = require("fs"); // 파일 읽기, 쓰기 위한 모듈

let todos = [];

try{
    const fileData = fs.readFileSync("todos.json", "utf-8");
    todos = JSON.parse(fileData);
}
catch (error){

}

const command = process.argv[2];
const taskOrId = process.argv[3];

switch(command){
    case "add":
        //addToDo 함수 실행
        addToDo(taskOrId);
        break;
    
    case "list":
        //listToDos 함수 실행
        listToDos();
        break;

    case "done":
        //doneToDo 함수 실행
        doneToDo(taskOrId);
        break;

    case "delete":
        // deleteToDo 함수 실행
        deleteToDo(taskOrId);
        break;

    case "update":
        // updateToDo 함수 실행
        const newContent = process.argv[4];
        updateToDo(id, newContent);
        break;

    default:
        console.log("유효한 명령을 입력해주세요");
        break;

}


function addToDo(content){ // 새로운 To Do 추가하는 함수. 고유한 ID 부여하고 "Todo가 추가되었습니다: [내용]" 메시지 출력해야함 --> json 파일에 저장
    // string 형태로 content 받아옴
    let num = todos.length - 1;
    let idNum;

    if (num >= 0){
        idNum = todos[num].id + 1;
    }
    else{
        idNum = 1;
    }

    const newToDo = {
        id: idNum,
        content: content,
        done: false
    };

    todos.push(newToDo);

    const jsonString = JSON.stringify(todos, null, 2);
    fs.writeFileSync("todos.json", jsonString, "utf-8");

    console.log(`Todo가 추가되었습니다: ${content}`);
}

function listToDos(){ // 전체 To Do 목록을 출력하는 함수
    let num = todos.length;

    if (num == 0){
        console.log("Todo가 없습니다.");
        return;
    }
    else{
        for (const todo of todos){
            const mark = todo.done ? "[x]" : "[ ]";
            console.log(`${mark} ${todo.id}. ${todo.content}`);
        }
        return;
    }
}

/*
function doneToDo(id){ // 특정 항목을 완료 상태로 변경하는 함수

}

function deleteToDo(id){ // 특정 항목을 삭제하는 함수

}

function updateToDo(id, content){ // 특정 항목 내용을 변경하는 함수 

}

*/
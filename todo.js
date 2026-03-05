const fs = require("fs"); // 파일 읽기, 쓰기 위한 모듈

const command = process.argv[2];
const taskOrId = process.argv[3];

switch(command){
    case "add":
        //addToDo 함수 실행
        break;
    
    case "list":
        //listToDos 함수 실행
        break;

    case "done":
        //doneToDo 함수 실행
        break;

    case "delete":
        // deleteToDo 함수 실행
        break;

    case "update":
        // updateToDo 함수 실행
        break;

    default:
        console.log("유효한 명령을 입력해주세요");
        break;

}


function addToDo(content){ // 새로운 To Do 추가하는 함수. 고유한 ID 부여하고 "Todo가 추가되었습니다: [내용]" 메시지 출력해야함 --> json 파일에 저장

}

function listToDos(){ // 전체 To Do 목록을 출력하는 함수

}

function doneToDo(id){ // 특정 항목을 완료 상태로 변경하는 함수

}

function deleteToDo(id){ // 특정 항목을 삭제하는 함수

}

function updateToDo(id, content){ // 특정 항목 내용을 변경하는 함수 

}

import fs from 'node:fs'; // 파일 제어 도구 불러오기

const args = process.argv.slice(2); // 1, 2번째 인자는 불필요하므로 제거
const FILE_NAME = 'todos.json'

if (args.length <= 0) {
    console.log('잘못된 명령입니다.');
    process.exit(0)
}

const command = args[0]; // 명령어
const todos = JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8') || "[]"); // todos.json을 읽어서(빈 파일이면 "[]") 자바스크립트 객체로 parse

switch (command) {
    case "add":
        const task = args[1]; // 할 일 내용
        addTodo(task);
        break;
    
    case "list":
        listTodos();
        break;
    
    case "done":
    case "delete":
    case "update":
        const targetId = parseInt(args[1]); // 완료/삭제/수정 처리할 ID
        const newTask = args[2] || ""; // 새로운 할 일 내용
        processTodo(targetId, command, newTask);
        break;
    
    default:
        console.log("잘못된 명령입니다.");
}

// 문자열이 유효한지 체크하는 함수
function isEmpty(str){	
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false;
}

function addTodo(task){
    const nextId = todos.length > 0 ? Math.max(...todos.map((x) => x.id)) + 1 : 1;
        if(!isEmpty(task)) {
            const data = {
                id: nextId,
                content: task,
                done: false
            };
            todos.push(data); // 배열에 새로운 데이터 추가
            fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2)); // JSON으로 인코딩해서 todos.json에 저장
            console.log("Todo가 추가되었습니다: %s", task);
        }
}

function listTodos(){
    if(todos.length === 0) {
            console.log("Todo가 없습니다.");
        } else {
            todos.forEach(todo => {
                let todoDone = todo.done ? 'x' : ' '; // 완료된 일에 대해서만 'x' 저장
                console.log("[%s] %s. %s", todoDone, todo.id, todo.content); // todo 리스트 출력
            });
        }
}

function processTodo(targetId, command, newTask=""){
    const todoIndex = todos.findIndex(t => t.id === targetId); // 저장된 json 파일에서 인덱스 찾기 (존재하지 않으면 -1)
        if(isNaN(targetId) || todoIndex === -1) {
            console.log("해당 ID를 찾을 수 없습니다.");
        } else {
            if(command === "done") {
                todos[todoIndex].done = true; // 완료 처리
                console.log("ID %d번 항목이 완료되었습니다.", targetId);
            } else if(command === "delete") {
                todos.splice(todoIndex, 1); // 삭제 처리
                console.log("ID %d번 항목이 삭제되었습니다.", targetId);
            } else {
                if(!isEmpty(newTask)) {
                    todos[todoIndex].content = newTask; // 내용 수정
                    console.log("ID %d번 항목이 수정되었습니다: %s", targetId, newTask);
                }
            }
            fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2));
        }
}
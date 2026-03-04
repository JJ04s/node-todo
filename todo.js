import fs from 'node:fs';

const FILE_NAME = "todos.json"

// read file, if none, return []
function read_todos() {
    try {
        const data = fs.readFileSync(FILE_NAME, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// write file 
function write_todos(todos){
    fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2));
}

/* 
TODO list 추가
추가된 Todo는 고유 ID(1부터 순차 증가)
추가 후 "Todo가 추가되었습니다: [내용]" 출력
*/

function add_todo(content){

    const todos = read_todos();

    if (todos.length===0) {
        const add_id = 1;
    } else {
        const add_id = Math.max(...todos.map(todo => todo.id)) +1;
    }

    todos.push({ id: add_id, "content": content, done: false });
    write_todos(todos);

    console.log(`Todo가 추가되었습니다: ${content}`);
}

/* 
TODO list 조회
출력 형식은 [ ] 1. 장보기
완료된 항목은 [x]
Todo가 없으면 "Todo가 없습니다."
*/
function list_todo(){

    const todos = read_todos();

    if (todos.length === 0) {
        console.log(`Todo가 없습니다.`);
        return
    }

    todos.forEach(todo => {
        const box = todo.done ? `[x]` : `[ ]`;
        console.log(`${box} ${todo.id}. ${todo.content}`);
    })
}

/*
완료 처리
done [ID] 명령
처리 후 "[ID]번 항목이 완료되었습니다." 메시지 출력
존재하지 않는 ID의 경우 "해당 ID를 찾을 수 없습니다." 출력
*/
function done_todo(){}

/*
삭제 기능
delete [ID]
delete는 reserved word인데 어떻게 하지?
process.argv[] 사용자 입력 명령어를 배열로 담아준다.
*/

function delete_todo(){}

/*
내용 변경 기능
update [ID] "새 내용" 명령으로 내용 수정
*/
function update_todo(){}

const commands = {}

const command = process.argv[2];
const id = process.argv[3];
const content = process.argv[4];

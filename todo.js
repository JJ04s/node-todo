import fs from 'node:fs'; // 파일 제어 도구 불러오기

const args = process.argv.slice(2); // 1, 2번째 인자는 불필요하므로 제거

if (args.length <= 0) {
    console.log('잘못된 명령입니다.');
    process.exit(0)
}

const command = args[0]; // 명령어
const todos = JSON.parse(fs.readFileSync('todos.json', 'utf-8') || "[]"); // todos.json을 읽어서(빈 파일이면 "[]") 자바스크립트 객체로 parse

switch (command) {
    case "add":
        const task = args[1]; // 할 일 내용
        if(!isEmpty(task)) {
            const data = {
                id: todos.length + 1,
                content: task,
                done: false
            };
            todos.push(data); // 배열에 새로운 데이터 추가
            fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2)); // JSON으로 인코딩해서 todos.json에 저장
            console.log("Todo가 추가되었습니다: %s", task)
        }
}

// 문자열이 유효한지 체크하는 함수
function isEmpty(str){	
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
}
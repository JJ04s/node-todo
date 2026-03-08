import fs from 'node:fs'; // 파일 제어 도구 불러오기

const args = process.argv;
const command = args[2];
const text = args[3];
const text2 = args[4];

let todos = [];
try {
    if (fs.existsSync('todos.json')) {
        const data = fs.readFileSync('todos.json', 'utf-8');
        todos = JSON.parse(data);
    } // todos에 todos.json의 내용을 불러와서 저장
} catch (e) {
    todos = [];
}
if (command === 'add') {
    let newID;

    if (todos.length === 0) { //todos가 비어있다면 id는 1부터 시작
        newID = 1; 
    } else {
        newID = todos[todos.length - 1].id + 1;
    }
    
    const newTodo = {
        id: newID, content : text, done : false
    };
    todos.push(newTodo); // newTodo 객체를 todos 배열에 추가

    fs.writeFileSync('todos.json', JSON.stringify(todos)); // todos 배열을 todos.json에 저장
    console.log('Todo가 추가되었습니다: ['+text+']');
} else if (command === 'list') {
    let todoslist = [];
    try { //todos.json의 내용을 todoslist에 저장
        const data = fs.readFileSync('todos.json', 'utf-8');
        todoslist = JSON.parse(data);
    } catch (e) {
    // 파일이 비어있음
    todoslist = [];
    }
    if (todoslist.length === 0) { // todoslist가 비어있다면 종료
        console.log('Todo가 없습니다.');
    } else {
        while(todoslist.length > 0) {
            const todo = todoslist.shift(); //todoslist의 요소를 todo에 전달하고 삭제
            const status = todo.done 
            if(status === true) {
                console.log('[x] ' + todo.id.toString() + '. ' + todo.content);
            }
            else {
                console.log('[ ] ' + todo.id.toString() + '. ' + todo.content);
            }
        }
    }
} else if (command === 'done') {
    let todoslist = [];
    try { //todos.json의 내용을 todoslist에 저장
        const data = fs.readFileSync('todos.json', 'utf-8');
        todoslist = JSON.parse(data);
    } catch (e) {
    // 파일이 비어있음
    todoslist = [];
    }
    const item = todoslist.find((todo) => todo.id === parseInt(text)); //text와 일치하는 todo 찾기
    
    if(item) {
        item.done = true;

        fs.writeFileSync('todos.json', JSON.stringify(todoslist));
        console.log('ID ' + text + '번 항목이 완료되었습니다.');
    } else {
        console.log('해당 ID를 찾을 수 없습니다.');
    }
} else if (command === 'undo') {
    let todoslist = [];
    try { //todos.json의 내용을 todoslist에 저장
        const data = fs.readFileSync('todos.json', 'utf-8');
        todoslist = JSON.parse(data);
    } catch (e) {
    // 파일이 비어있음
    todoslist = [];
    }
    const item = todoslist.find((todo) => todo.id === parseInt(text)); //text와 일치하는 todo 찾기
    
    if(item) {
        item.done = false;

        fs.writeFileSync('todos.json', JSON.stringify(todoslist));
        console.log('ID ' + text + '번 항목이 취소되었습니다.');
    } else {
        console.log('해당 ID를 찾을 수 없습니다.');
    }
} else if (command === 'delete') {
    let todoslist = [];
    try { //todos.json의 내용을 todoslist에 저장
        const data = fs.readFileSync('todos.json', 'utf-8');
        todoslist = JSON.parse(data);
    } catch (e) {
    // 파일이 비어있음
    todoslist = [];
    }
    const item = todoslist.find((todo) => todo.id === parseInt(text)); //text와 일치하는 todo 찾기
    
    if(item) {
        todoslist.splice(todoslist.indexOf(item), 1); //todoslist에서 해당 요소 삭제
        fs.writeFileSync('todos.json', JSON.stringify(todoslist));
        console.log('ID ' + text + '번 항목이 삭제되었습니다.');
    } else {
        console.log('해당 ID를 찾을 수 없습니다.');
    }
} else if (command == 'update') {
    let todoslist = [];
    try { //todos.json의 내용을 todoslist에 저장
        const data = fs.readFileSync('todos.json', 'utf-8');
        todoslist = JSON.parse(data);
    } catch (e) {
    // 파일이 비어있음
    todoslist = [];
    }
    const item = todoslist.find((todo) => todo.id === parseInt(text)); //text와 일치하는 todo 찾기
    
    if(item) {
        item.content = args[4]; //content 업데이트
        item.done = false; //done 초기화
        fs.writeFileSync('todos.json', JSON.stringify(todoslist));
        console.log('ID ' + text + '번 항목이 변경되었습니다.');
    } else {
        console.log('해당 ID를 찾을 수 없습니다.');
    }
}
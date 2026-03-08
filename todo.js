// fs(file system)은 파일을 읽고 쓰는 기능을 제공하는 모듈
import fs from 'node:fs'; // 파일 제어 도구 불러오기

// 저장할 파일 경로 설정
const FILE_PATH = "./todos.json"

// 파일에서 Todo 목록 불러오기 함수
function loadTodos() {
    // 파일이 존재하지 않으면, 즉 처음 실행하는 경우 빈 배열 반환
    if (!fs.existsSync(FILE_PATH)) {
        return [];
    }

    // 파일 내용을 문자열로 읽어오기
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    // 파일이 비어있으면 빈 배열 반환
    return data ? JSON.parse(data) : [];
}

// Todo 목록을 파일에 저장하는 함수
function saveTodos(todos) {
    // JSON.stringify()는 자바스크립트 배열을 JSON 문자열로 바꿔줌
    // null, 2는 예쁘게 들여쓰기 하기 위함
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

// Todo 추가 함수
function addTodo(content) {
    // 기존 Todo 목록 불러오기
    const todos = loadTodos();
    
    // 새로운 ID 만들기
    // 만약 기존 데이터가 있다면 maxID + 1, 없다면 1
    const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    
    // 새로운 Todo 객체 생성
    const newTodo = {
    id: newId,  // 번호
    content: content,   // 내용
    done: false,    // 완료 여부 (처음엔 false)
  };

    // 배열에 추가
    todos.push(newTodo);
    // 파일에 저장
    saveTodos(todos);

    console.log(`Todo가 추가되었습니다: ${content}`);
}

// Todo 목록 출력 함수
function listTodos() {
    // 기존 Todo 목록 불러오기
    const todos = loadTodos();

    // 아무것도 없으면 안내 메시지 출력
    if (todos.length === 0) {
        console.log("Todo가 없습니다.");
        return;
    }

    // 각 Todo를 하나씩 출력
    todos.forEach((todo) => {
        // Todo 완료 여부에 따라 표시 다르게
        const mark = todo.done ? "[x]" : "[ ]";
        console.log(`${mark} ${todo.id}. ${todo.content}`);
    });
}

// Todo 완료 처리 함수
function doneTodo(id) {
    // 기존 Todo 목록 불러오기
    const todos = loadTodos();
    // 해당 ID 찾기
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    }

    // 완료 처리
    todo.done = true;
    // 파일에 저장
    saveTodos(todos);

    console.log(`ID ${id}번 항목이 완료되었습니다.`);
}

// Todo 삭제 함수
function deleteTodo(id) {
    // 기존 Todo 목록 불려오기
    const todos = loadTodos();
    
    // 해당 ID를 제외한 새로운 배열 만들기
    const filtered = todos.filter((t) => t.id !== id);

    if (filtered.length === todos.length) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    }

    // 파일에 저장
    saveTodos(filtered);

    console.log(`ID ${id}번 항목이 삭제되었습니다.`);
}

function updateTodo(id, newContent) {
    // 기존 Todo 목록 불러오기
    const todos = loadTodos();

    const todo = todos.find((t) => t.id === id);

    if (!todo) {
        console.log("해당 ID를 찾을 수 없습니다.");
        return;
    }

    todo.content = newContent;
    // 파일에 저장
    saveTodos(todos);

    console.log(`ID ${id}번 항목이 수정되었습니다.`);
}

// 명령어 처리
// process.argv는 명령어 배열
const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    addTodo(args.join(" "));
    break;

  case "list":
    listTodos();
    break;

  case "done":
    doneTodo(Number(args[0]));
    break;

  case "delete":
    deleteTodo(Number(args[0]));
    break;

  case "update":
    updateTodo(Number(args[0]), args.slice(1).join(" "));
    break;

  default:
    console.log("사용 가능한 명령어:");
    console.log("node todo.js add \"내용\"");
    console.log("node todo.js list");
    console.log("node todo.js done [ID]");
    console.log("node todo.js delete [ID]");
    console.log("node todo.js update [ID] \"새 내용\"");
}
const fs = require('fs');

// CLI 인자 파싱
const args = process.argv.slice(2);
const command = args[0];

// loadTodos() — 파일에서 todo 목록 읽기
function loadTodos() {
    if (!fs.existsSync('todos.json')) {
      return [];
    }
    const data = fs.readFileSync('todos.json', 'utf-8');
    return JSON.parse(data);
  }

// saveTodos() — todo 목록을 파일에 저장
function saveTodos(todos) {
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
  }

// addTodo(content) — todo 추가
function addTodo(content) {
  const todos = loadTodos();
  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  todos.push({ id, content, done: false });
  saveTodos(todos);
  console.log(`Todo가 추가되었습니다: ${content}`);
}

// 분기
if (command === 'add') { // todo 추가 함수
    addTodo(args[1]); // 뒷 부분
    // 나중에 채울 것
  } else if (command === 'list') { // 목록 출력 함수
    // 나중에 채울 것
  } else if (command === 'done') { // 완료 처리 함수
    // 나중에 채울 것
  } else {
    console.log('알 수 없는 명령입니다.');
  }
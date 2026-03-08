import type { CliPresenter, CliRepository } from '../domain/cli-interface.js';

const showAllCommands = () => {
  console.log('사용법:');
  console.log('  node todo.js add "할 일 내용"    - Todo 추가');
  console.log('  node todo.js list                - 전체 목록 조회');
  console.log('  node todo.js done [ID]           - 완료 처리');
  console.log('  node todo.js delete [ID]         - 삭제 (선택 기능)');
  console.log('  node todo.js update [ID] "내용"  - 내용 수정 (선택 기능)');
};

export const implCliPresenter = ({
  cliRepository,
}: {
  cliRepository: CliRepository;
}): CliPresenter => ({
  showCliCommand: () => {
    const result = cliRepository.parseCommand();

    if (result.state === 'ERROR') {
      const { detailedError } = result;
      switch (detailedError) {
        case 'NO_CONTENT_IN_ADD': {
          console.log('오류: 추가할 Todo 내용을 입력하세요.');
          console.log('사용법: node todo.js add "할 일 내용"');
          return;
        }
        case 'NO_ID_IN_DONE': {
          console.log('오류: ID를 반드시 입력하세요.');
          console.log('사용법: node todo.js done [ID]');
          return;
        }
        case 'INVALID_ID_IN_DONE': {
          console.log('오류: 유효한 ID를 숫자로 입력하세요.');
          console.log('사용법: node todo.js done [ID]');
          return;
        }
        case 'NO_ID_IN_DELETE': {
          console.log('오류: ID를 반드시 입력하세요.');
          console.log('사용법: node todo.js delete [ID]');
          return;
        }
        case 'INVALID_ID_IN_DELETE': {
          console.log('오류: 유효한 ID를 숫자로 입력하세요.');
          console.log('사용법: node todo.js delete [ID]');
          return;
        }
        case 'NO_ID_IN_UPDATE': {
          console.log('오류: ID를 반드시 입력하세요.');
          console.log('사용법: node todo.js update [ID] "새 내용"');
          return;
        }
        case 'INVALID_ID_IN_UPDATE': {
          console.log('오류: 유효한 ID와 내용을 입력하세요.');
          console.log('사용법: node todo.js update [ID] "새 내용"');
          return;
        }
        case 'INVALID_COMMAND': {
          console.log('오류: 알 수 없는 명령어입니다.');
          showAllCommands();
          return;
        }
      }
    }
    switch (result.state) {
      case 'HELP': {
        showAllCommands();
        return;
      }
      case 'ADD_TODO': {
        console.log('add todo!');
        return;
      }
      case 'READ_TODOS': {
        console.log('read todos!');
        return;
      }
      case 'UPDATE_DONE': {
        console.log('update done!');
        return;
      }
      case 'UPDATE': {
        console.log('update');
        return;
      }
      case 'DELETE': {
        console.log('delete!');
        return;
      }
    }
  },
});

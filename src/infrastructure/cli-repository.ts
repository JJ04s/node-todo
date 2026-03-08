import type { CliRepository } from '../domain/cli-interface.js';

export const implCliRepository = (): CliRepository => ({
  parseCommand: () => {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === undefined) {
      return { state: 'HELP' };
    }

    switch (command) {
      case 'add': {
        const content = args[1];
        if (content === undefined) {
          return { state: 'ERROR', detailedError: 'NO_CONTENT_IN_ADD' };
        }
        return { state: 'ADD_TODO' };
      }

      case 'list': {
        return { state: 'READ_TODOS' };
      }

      case 'done': {
        if (args[1] === undefined) {
          return { state: 'ERROR', detailedError: 'NO_ID_IN_DONE' };
        }
        const id = parseInt(args[1], 10);
        if (isNaN(id)) {
          return {
            state: 'ERROR',
            detailedError: 'INVALID_ID_IN_DONE',
          };
        }
        return { state: 'UPDATE_DONE' };
      }

      case 'delete': {
        if (args[1] === undefined) {
          return { state: 'ERROR', detailedError: 'NO_ID_IN_DELETE' };
        }
        const id = parseInt(args[1], 10);
        if (isNaN(id)) {
          return { state: 'ERROR', detailedError: 'INVALID_ID_IN_DELETE' };
        }
        return { state: 'DELETE' };
      }

      case 'update': {
        if (args[1] === undefined) {
          return { state: 'ERROR', detailedError: 'NO_ID_IN_UPDATE' };
        }
        const id = parseInt(args[1], 10);
        const newContent = args[2];
        if (isNaN(id) || newContent !== undefined) {
          return { state: 'ERROR', detailedError: 'INVALID_ID_IN_UPDATE' };
        }
        return { state: 'UPDATE' };
      }

      default:
        return { state: 'ERROR', detailedError: 'INVALID_COMMAND' };
    }
  },
});

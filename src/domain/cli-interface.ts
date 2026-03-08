import type { CLI_DETAILED_ERROR } from './cli-detailed-error.js';
import type { CLI_STATE } from './cli-state.js';

export type CliRepository = {
  parseCommand: () =>
    | {
        state: Exclude<CLI_STATE, 'ERROR'>;
      }
    | {
        state: 'ERROR';
        detailedError: CLI_DETAILED_ERROR;
      };
};

export type CliPresenter = {
  showCliCommand: () => void;
};

import { implTodoUsecase } from './src/application/todo-usecase.js';
import { implCliRepository } from './src/infrastructure/cli-repository.js';
import { implFileRepository } from './src/infrastructure/file-repository.js';
import { implCliPresenter } from './src/interface/cli-presenter.js';

const fileRepository = implFileRepository();
const cliRepository = implCliRepository();
const todoUsecase = implTodoUsecase({ fileRepository });
const cliPresenter = implCliPresenter({ cliRepository, todoUsecase });

cliPresenter.run();

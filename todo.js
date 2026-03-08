import { implCliRepository } from './src/infrastructure/cli-repository.ts';
import { implCliPresenter } from './src/interface/cli-presenter.ts';

const cliRepository = implCliRepository();
const cliPresenter = implCliPresenter({ cliRepository });

cliPresenter.showCliCommand();

import { 
  screen,
  waitFor,
  waitForElementToBeRemoved 
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as musicsAPI from '../services/musicsAPI';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';
import renderPath from './helpers/renderPath';
import { 
  defaultUser,
  musicAPIDefaultResponse,
  favoriteSongsList
} from './mocks';

describe('11 - Crie o mecanismo para remover músicas na lista de músicas favoritas', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
    localStorage.setItem('favorite_songs', JSON.stringify(favoriteSongsList));
  });

  afterEach(() => localStorage.clear());


  it('Será validado se a função removeSong é chamada quando algum checkbox que já esteja marcado é clicado',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );

      const spy = jest.spyOn(favoriteSongsAPI, 'removeSong');

      renderPath("/#/album/12");

      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

    
      userEvent.click(screen.getByTestId('checkbox-music-12'));
      await waitForElementToBeRemoved(
        () => screen.getAllByTestId('loader'),
        { timeout: 3000 },
      );

      expect(spy).toHaveBeenCalled();
    });

  it('Será validado se a mensagem Carregando... é exibida após clicar no checkbox e removida depois do retorno da API',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );

      renderPath("/#/album/12");

      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );
      userEvent.click(screen.getByTestId('checkbox-music-12'));

      expect(screen.getByTestId('loader')).toBeInTheDocument();

      await waitForElementToBeRemoved(
        () => screen.getAllByTestId('loader'),
        { timeout: 3000 },
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

  it('Será validado se o número de checkboxes marcados como checked diminui quando um checkbox marcado é clicado',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );

      renderPath("/#/album/12");

      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(JSON.parse(global.localStorage.getItem('favorite_songs'))).toHaveLength(2);

      userEvent.click(screen.getByTestId('checkbox-music-12'));
      await waitForElementToBeRemoved(
        () => screen.getAllByTestId('loader'),
        { timeout: 3000 },
      );

      expect(JSON.parse(global.localStorage.getItem('favorite_songs'))).toHaveLength(1);

      userEvent.click(screen.getByTestId('checkbox-music-31'));
      await waitForElementToBeRemoved(
        () => screen.getAllByTestId('loader'),
        { timeout: 3000 },
      );

      expect(JSON.parse(global.localStorage.getItem('favorite_songs'))).toHaveLength(0);
    });
});

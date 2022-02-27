import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as musicsAPI from '../services/musicsAPI';
import * as favoriteSongsAPI from '../services/favoriteSongsAPI';
import renderPath from './helpers/renderPath';
import { defaultUser, musicAPIDefaultResponse } from './mocks';

describe('8 - Crie o mecanismo para adicionar músicas na lista de músicas favoritas', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se existe um checkbox para cada música da lista',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );

      renderPath("/album/123");

      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(screen.getByTestId('checkbox-music-12')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-21')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-31')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-42')).toBeInTheDocument();
    });

  it('Será validado se a função addSong é chamada quando algum checkbox é clicado',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );
      
      const spy = jest.spyOn(favoriteSongsAPI, 'addSong');

      renderPath("/album/123");

      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      userEvent.click(screen.getByTestId('checkbox-music-12'));
      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(spy).toHaveBeenCalled();
    });


  it('Será validado se a mensagem Carregando... é exibida após clicar no checkbox e removida depois do retorno da API',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );
      
      renderPath("/album/123");

      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      userEvent.click(screen.getByTestId('checkbox-music-12'));
      expect(screen.getByTestId('loader')).toBeInTheDocument();

      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

  it('Será validado se o número de checkboxes marcados como checked aumenta quando um checkbox é clicado',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );
      

      renderPath("/album/123");

      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(JSON.parse(global.localStorage.getItem('favorite_songs'))).toHaveLength(0);

      userEvent.click(screen.getByTestId('checkbox-music-12'));
      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      // expect(JSON.parse(global.localStorage.getItem('favorite_songs'))).toHaveLength(1);

      userEvent.click(screen.getByTestId('checkbox-music-31'));
      await waitFor(
        () => expect(screen.queryAllByTestId('loader')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(JSON.parse(global.localStorage.getItem('favorite_songs'))).toHaveLength(2);

    });
});

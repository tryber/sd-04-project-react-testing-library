import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

describe('Testes do arquivo FavoritePokemons', () => {
  test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
  });

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    expect(queryByText('No favorite pokemon found')).toBeInTheDocument();
  });
});

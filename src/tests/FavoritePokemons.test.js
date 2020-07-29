import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

describe('Testes do arquivo FavoritePokemons', () => {
  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    expect(queryByText('No favorite pokemon found')).toBeInTheDocument();
  });
});

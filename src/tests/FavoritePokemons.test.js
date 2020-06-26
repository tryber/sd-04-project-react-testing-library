import React from 'react';
import { cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helper/renderWithRouter';

afterEach(cleanup);

describe('Testes da página Favorites', () => {
  it('Mensagem ~No favorite pokemon found~', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />, { route: '/favorites' });

    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();

    const pokemon = document.querySelector('.favorite-pokemon');

    expect(pokemon).not.toBeInTheDocument();
  });
});

import React from 'react';
// import { render, cleanup, getAllByTestId } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// test('', () => {});

afterEach(() => window.localStorage.clear());

describe('Testes do arquivo FavoritePokemons.js', () => {
  test('No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/favorites' });
    const heading = getByText(/No favorite pokemon found/i);
    expect(heading).toBeInTheDocument();
  });

  test('No Pokemons should be displayed if not added', () => {
    const pokemonsIds = [25, 4];
    window.localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemonsIds));
    const { getByText } = renderWithRouter(<App />, { route: '/favorites' });
    const pikachu = getByText(/pikachu/i);
    const charmander = getByText(/charmander/i);
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });

  test('Only Favorite Pokemon should be displayed', () => {
    const pokemons = [25, 23];
    window.localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemons));
    const { getAllByTestId } = renderWithRouter(<App />, { route: '/favorites' });
    const showFavorites = getAllByTestId('pokemon-name');
    expect(showFavorites.length).toBe(2);
  });
});

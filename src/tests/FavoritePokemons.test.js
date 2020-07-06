import React from 'react';
import { cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './resource';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

test('Favorites should display message if had no pokemons added', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/favorites' });
  const heading = getByText(/No favorite pokemon found/i);
  expect(heading).toBeInTheDocument();
});

test('No Pokemons should be displayed if not added', () => {
  const pokemons = [25, 10];
  window.localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemons));
  const { getByText } = renderWithRouter(<App />, { route: '/favorites' });
  const pikachu = getByText(/pikachu/i);
  const caterpie = getByText(/caterpie/i);
  expect(pikachu).toBeInTheDocument();
  expect(caterpie).toBeInTheDocument();
});

test('Only Favorite Pokemon should be displayed', () => {
  const pokemons = [25, 10];
  window.localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemons));
  const { getAllByTestId } = renderWithRouter(<App />, { route: '/favorites' });
  const allFavorite = getAllByTestId('pokemon-name');
  expect(allFavorite.length).toBe(2);
});

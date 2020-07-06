import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './resource';
import pokemons from '../data';

afterEach(cleanup);

test('Should have the right name', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const name = getByTestId('pokemon-name');
  expect(name.innerHTML).toMatch(pokemons[0].name);
  const type = getByTestId('pokemonType');
  expect(type.innerHTML).toMatch(pokemons[0].type);
});

test('Should have the right weight and measurament unit', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const weight = getByTestId('pokemon-weight');
  expect(weight.innerHTML).toMatch(
    `Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`,
  );
});

test('Should have the right image', () => {
  const { getByAltText } = renderWithRouter(<App />);
  const image = getByAltText(`${pokemons[0].name} sprite`);
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(pokemons[0].image);
});

test('Nav link should be pointed to the right url', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More Details/i));
  expect(history.location.pathname).toMatch(`/pokemons/${pokemons[0].id}`);
});

test('Favorite itens should display a star icon', () => {
  const favPokemons = [25];
  window.localStorage.setItem(
    'favoritePokemonIds',
    JSON.stringify(favPokemons),
  );
  const { getByAltText } = renderWithRouter(<App />);
  const favImage = getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(favImage.src).toMatch('/star-icon.svg');
});

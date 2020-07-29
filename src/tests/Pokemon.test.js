import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('should see a card from a certain Pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
});

test('a must see the correct name of the pokedude', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name').innerHTML).toBe(pokemons[0].name);
  expect(getByTestId('pokemonType').innerHTML).toBe(pokemons[0].type);
});

test('See the average weight and measurement unit of the pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const { value } = pokemons[0].averageWeight;
  const { measurementUnit } = pokemons[0].averageWeight;
  expect(getByTestId('pokemon-weight')).toHaveTextContent(
    `Average weight:${value}${measurementUnit}`,
  );
});

test('the image must have the #src with the URL', () => {
  const { getByRole } = renderWithRouter(<App />);
  const img = getByRole('img');
  expect(img.src).toBe(pokemons[0].image);
  expect(img.alt).toBe(`${pokemons[0].name} sprite`);
});

test('the navigation link to see the details', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(/More Details/i).href).toMatch(`/pokemons/${pokemons[0].id}`);
});

test('the navigation link for details', () => {
  const { history, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More Details/i));
  expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

test('the star icon', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More Details/i));
  fireEvent.click(getByText(/Pokémon favoritado/i));
  const icon = getAllByRole('img')[1];
  expect(icon.src).toMatch('/star-icon.svg');
  expect(icon.alt).toBe('Pikachu is marked as favorite');
});

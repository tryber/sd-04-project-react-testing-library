import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

test('A card with the information of a specific Pokémon must be returned', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
});

test('The correct name of the Pokémon should appear on the screen', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name').innerHTML).toBe(pokemons[0].name);
});

test('The average weight of the Pokémon should be displayed with certain text format', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-weight')).toHaveTextContent(
    `Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`,
  );
});

test('The image must contain a src attribute with the URL of the pokémon image. The image should also have an alt attribute with the text <name> sprite, where <name> is the name of the pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const img = getByRole('img');
  expect(img.alt).toBe(`${pokemons[0].name} sprite`);
  expect(img.src).toBe(pokemons[0].image);
});

test('The Pokémon displayed on the Pokédex must contain a navigation link to view details of this Pokémon. The link must have the URL / pokemons / <id>, where <id> is the pokemon id displayed', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(/More Details/i).href).toMatch(`/pokemons/${pokemons[0].id}`);
});

test('When clicking on the pokémon navigation link, the application should be redirected to the pokemon details page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More Details/i));
  expect(history.location.pathname).toBe(`pokemons/${pokemons[0].id}`);
});

test('Favorite Pokémon should display a star icon', () => {
  const { getByLabelText, getAllByRole } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });

  const addFavPoke = getByLabelText(/Pokémon favoritado/i);
  fireEvent.click(addFavPoke);
  const images = getAllByRole('img');
  console.log(images[1].src);
  expect(images[1].src).toBe('http://localhost/star-icon.svg');
  expect(images[1].alt).toBe(`${pokemons[0].name} is marked as favorite`);
});

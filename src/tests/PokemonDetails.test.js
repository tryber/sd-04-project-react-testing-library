import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('pokemon details', () => {
  const { getByText } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const pokeDetails = getByText(/Pikachu Details/i);
  expect(pokeDetails).toBeInTheDocument();
});

test('Summary', () => {
  const { getByText } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Summary/i)).toBeInTheDocument();
});

test('pokemon game location', () => {
  const { getByText } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();
});

test('pokemon image location', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const image = getAllByRole('img');
  expect(image[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(image[2].alt).toBe('Pikachu location');
});

test('pokemon favorite is checked', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
});

test('summary of pokemon', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(
    getByText(
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    ),
  ).toBeInTheDocument();
});

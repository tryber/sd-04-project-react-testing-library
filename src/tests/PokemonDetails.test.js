import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('show pokemon details when More details button is clicked', () => {
  const { getByText } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const pokeDetails = getByText(/Pikachu Details/i);
  expect(pokeDetails).toBeInTheDocument();
});

test('show Summary', () => {
  const { getByText } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Summary/i)).toBeInTheDocument();
});

test('show game location of pokemon', () => {
  const { getByText } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();
});

test('show image location of pokemon', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  
  const image = getAllByRole('img');
  expect(image[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(image[2].alt).toBe('Pikachu location');
});

test('show if pokemon favorite is checked', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
});

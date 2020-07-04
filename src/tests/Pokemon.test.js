import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('show pokemon name', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const pokeName = getByTestId('pokemon-name');
  expect(pokeName.textContent).toBe('Pikachu');
});

test('show pokemon type', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const pokeType = getByTestId('pokemonType');
  expect(pokeType.textContent).toBe('Electric');
});

test('show pokemon average weight', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const pokeWeight = getByTestId('pokemon-weight');
  expect(pokeWeight.textContent).toBe('Average weight:6.0kg');
});


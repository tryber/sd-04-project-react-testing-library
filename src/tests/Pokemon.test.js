import React from 'react';
import { fireEvent } from '@testing-library/react';

import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('O nome correto do pokémon deve aparecer na tela', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const pokeName = getByTestId('pokemon-name');
  expect(pokeName.textContent).toBe('Pikachu');
});

test(`O peso médio do pokémon deve ser exibido com um texto no formato 'Average weight: <value> <measurementUnit>',
  onde '<value>' e '<measurementUnit>' são, respectivamente, o peso médio do pokémon e sua unidade de medida`, () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const pokeWeight = getByTestId('pokemon-weight');
  expect(pokeWeight.textContent).toBe('Average weight:6.0kg');
});

test('show pokemon type', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const pokeType = getByTestId('pokemonType');
  expect(pokeType.textContent).toBe('Electric');
});

test('pokemon image', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  const image = getAllByRole('img');
  expect(image[0].src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(image[0].alt).toBe('Pikachu sprite');
});

test('redirect', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
  expect(getByText(/More details/i).href).toBe('http://localhost/pokemons/25');
});

test('favorite pokemon star icon', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByText(/Pokémon favoritado?/i));

  const image = getAllByRole('img');
  expect(image[1].src).toBe('http://localhost/star-icon.svg');
  expect(image[1].alt).toBe('Pikachu is marked as favorite');
});

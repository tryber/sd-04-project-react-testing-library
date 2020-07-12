import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('O botão [Próximo pokémon] deve conter o texto "Próximo pokémon"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Próximo pokémon')).toBeInTheDocument();
});

test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Próximo pokémon/i));

  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));

  const caterpie = getByText(/Caterpie/i);
  expect(caterpie).toBeInTheDocument();
});

test('Filtrar pokémons por tipo', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const typeButton = getAllByTestId('pokemon-type-button');
  const pokemonType = getByTestId('pokemonType');
  typeButton.forEach((type) => {
    fireEvent.click(type);
    expect(pokemonType.textContent).toBe(type.textContent);
  });
});

test('Resetar filtro', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/All/i));

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));

  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();
});

test('Com apenas um pokémon, botão proximo pokemon é desablilitado', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Dragon/i));
  const dragonair = getByText(/Dragonair/i);
  expect(dragonair).toBeInTheDocument();
  const nxtBtn = getByText(/Próximo pokémon/i);
  expect(nxtBtn.disabled).toBeTruthy();
});

test('Encountered Pokémons', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

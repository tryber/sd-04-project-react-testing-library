import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import data from '../data';

const pokemonTypes = [
  ...new Set(data.reduce((types, { type }) => [...types, type], [])),
];

test('Testando titulo', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/' });
  const title = getByText(/Encountered pokémons/i);
  expect(title).toBeInTheDocument();
});

test('A página deve exibir o próximo pokémon da lista', () => {
  const { getByTestId } = renderWithRouter(<App />, { route: '/' });
  const button = getByTestId('next-pokemon');
  expect(button).toBeInTheDocument();
  expect(button.type).toBe('button');
  expect(button.textContent).toBe('Próximo pokémon');
});

test('Botões de filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />, { route: '/' });
  pokemonTypes.forEach((type, i) => {
    const button = getAllByTestId('pokemon-type-button')[i];
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(type);
  });
});

test('Resetar o filtro', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/' });
  const reset = getByText(/all/i);
  expect(reset).toBeInTheDocument();
  fireEvent.click(reset);
  expect(getByText(data[0].name)).toBeInTheDocument();
});

test('Um botão de filtro para cada tipo de pokémon', () => {
  const { getByText, getAllByText } = renderWithRouter(<App />, { route: '/' });
  pokemonTypes.forEach((type) => {
    const button = getAllByText(type)[1] || getByText(type);
    expect(button).toBeInTheDocument();
  });
  const reset = getByText(/all/i);
  expect(reset).toBeInTheDocument();
});

test('O botão de `Próximo pokémon` deve ser desabilitado ', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />, { route: '/' });
  const button = getByTestId('next-pokemon');
  const bugType = getByText('Bug');
  fireEvent.click(bugType);
  expect(button).toBeDisabled();
});

import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

test('Verificando botão de próximo', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const proximo = getByText('Próximo pokémon');
  expect(proximo).toBeInTheDocument();
  expect(proximo).toHaveTextContent('Próximo pokémon');
  pokemons.forEach((e) => {
    const nomePoke = getByTestId('pokemon-name');
    expect(nomePoke).toHaveTextContent(e.name);
    fireEvent.click(proximo);
  });
  expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
});

test('Verificando pokemons', () => {
  const { queryAllByTestId } = renderWithRouter(<App />);
  expect(queryAllByTestId('pokemon-name')).toHaveLength(1);
});

test('Verificando filtros', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);

  const categoria = getAllByTestId('pokemon-type-button')[0];
  expect(categoria).toBeInTheDocument();
  expect(categoria).toHaveTextContent('Electric');

  const achados = getByText('Encountered pokémons');
  expect(achados).toBeInTheDocument();
  expect(achados).toHaveTextContent('Encountered pokémons');
});

test('Verificando botão de reset', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const proximoPoke = getByText('Próximo pokémon');
  const botoes = getByText('Fire');
  const botoesP = getByText('All');
  const nomePoke = getByTestId('pokemon-name');
  expect(botoesP).toBeInTheDocument();
  fireEvent.click(botoes);
  expect(nomePoke).toHaveTextContent('Charmander');
  fireEvent.click(botoesP);
  pokemons.forEach((e) => {
    expect(nomePoke).toHaveTextContent(e.name);
    fireEvent.click(proximoPoke);
  });
});

import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('Deve ser retornado um card com as informações de determinado pokémon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
});

test('O nome correto do pokémon deve aparecer na tela', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name').innerHTML).toBe(pokemons[0].name);
  expect(getByTestId('pokemonType').innerHTML).toBe(pokemons[0].type);
});

test('O peso médio do pokémon deve ser exibido com um texto no formato desejado', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const { value } = pokemons[0].averageWeight;
  const { measurementUnit } = pokemons[0].averageWeight;
  expect(getByTestId('pokemon-weight')).toHaveTextContent(
    `Average weight:${value}${measurementUnit}`,
  );
});

test('A imagem deve conter um atributo src com a URL da imagem do pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const img = getByRole('img');
  expect(img.src).toBe(pokemons[0].image);
  expect(img.alt).toBe(`${pokemons[0].name} sprite`);
});

test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(/More Details/i).href).toMatch(`/pokemons/${pokemons[0].id}`);
});

test('Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon', () => {
  const { history, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More Details/i));
  expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More Details/i));
  fireEvent.click(getByText(/Pokémon favoritado/i));
  const icon = getAllByRole('img')[1];
  expect(icon.src).toMatch('/star-icon.svg');
  expect(icon.alt).toBe('Pikachu is marked as favorite');
});

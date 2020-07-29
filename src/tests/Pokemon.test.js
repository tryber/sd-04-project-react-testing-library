import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import data from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

test('Informações de determinado pokémon, nome correto do pokémon deve aparecer na tela', () => {
  const { getByTestId, getByText, getAllByText } = renderWithRouter(<App />, { route: '/' });
  const namePokemon = getByTestId('pokemon-name');
  const typePokemon = getByTestId('pokemonType');
  expect(namePokemon).toBeInTheDocument();
  expect(typePokemon).toBeInTheDocument();
  data.forEach(({ name, type }) => {
    expect(getByText(name)).toBeInTheDocument();
    expect(getAllByText(type)[1]).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
  });
});

test('Peso médio do pokémon', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/' });
  const button = getByText('Próximo pokémon');
  data.forEach(({ averageWeight: { value, measurementUnit } }) => {
    const averageWeight = getByText(
      `Average weight:${value}${measurementUnit}`,
    );
    expect(averageWeight).toBeInTheDocument();
    fireEvent.click(button);
  });
});

test('URL da imagem do pokémon', () => {
  const { container, getByAltText, getByText } = renderWithRouter(<App />, { route: '/' });
  const img = container.querySelector('img');
  const button = getByText('Próximo pokémon');
  data.forEach(({ name, image }) => {
    const alt = getByAltText(`${name} sprite`);
    expect(alt).toBeInTheDocument();
    expect(img).toHaveAttribute('src', `${image}`);
    fireEvent.click(button);
  });
});

test('Exibir detalhes', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/' });
  const button = getByText(/Próximo pokémon/i);
  const moreInfo = getByText(/More details/i);
  data.forEach(({ id }) => {
    expect(moreInfo.href).toMatch(`pokemons/${id}`);
    fireEvent.click(button);
  });
});

test('Navegação do pokémon', () => {
  const { getByText, history } = renderWithRouter(<App />, { route: '/' });
  const moreInfo = getByText('More details');
  const { id } = data[0];
  fireEvent.click(moreInfo);
  expect(history.location.pathname).toMatch(`pokemons/${id}`);
});

test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { getByAltText } = renderWithRouter(
  <Pokemon pokemon={pokemons[7]} isFavorite />,
  );
  const img = getByAltText(`${pokemons[7].name} is marked as favorite`);
  expect(img).toBeInTheDocument();
  expect(img.src).toMatch(/\/star-icon.svg/);
});

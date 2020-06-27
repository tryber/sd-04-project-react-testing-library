import React from 'react';
import { cleanup } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../services/renderWithRouter';
import Data from '../data';

const isPokemonFavoriteById = {
  10: true,
  65: true,
};

describe('testes da pagina Pokemon', () => {
  afterEach(cleanup);

  test('testando o card de pokemon!', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={Data[2]} isFavorite={isPokemonFavoriteById[Data[2].id]} />,
    );
    const weight = Data[2].averageWeight.value;
    const measure = Data[2].averageWeight.measurementUnit;

    expect(getByTestId('pokemon-name').innerHTML).toBe(Data[2].name);
    expect(getByTestId('pokemonType').innerHTML).toBe(Data[2].type);
    expect(getByTestId('pokemon-weight').innerHTML).toBe(`Average weight:${weight}${measure}`);
  });

  test('Teste do src da imagem e do alt text', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={Data[2]} isFavorite={isPokemonFavoriteById[Data[2].id]} />,
    );

    expect(getByAltText(`${Data[2].name} sprite`)).toBeInTheDocument();
    expect(getByAltText(`${Data[2].name} sprite`).src).toBe(Data[2].image);
  });

  test('Testando a estrela de pokemon favoritado', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={Data[4]} isFavorite={isPokemonFavoriteById[Data[4].id]} />,
    );

    expect(getByAltText(`${Data[4].name} is marked as favorite`)).toBeInTheDocument();
    expect(getByAltText(`${Data[4].name} is marked as favorite`).src).toBe('http://localhost/star-icon.svg');
  });
});

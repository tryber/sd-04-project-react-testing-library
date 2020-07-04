import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../tests/renderWithRouter';

const information = pokemons[0];

describe('Requisito 6', () => {
  afterEach(cleanup);

  it('tipo do pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={information} isFavorite={false} />,
    );
    const type = getByTestId('pokemonType');
    expect(type.textContent).toBe(information.type);
  });

  it('nome do pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={information} isFavorite={false} />,
    );
    const name = getByTestId('pokemon-name');
    expect(name.textContent).toBe(information.name);
  });

  it('peso do pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={information} isFavorite={false} />,
    );
    const peso = getByTestId('pokemon-weight');
    expect(peso.textContent).toBe(
      `Average weight:${information.averageWeight.value}${information.averageWeight.measurementUnit}`,
    );
  });

  it('imagem pokemon', () => {
    const { getAllByAltText } = renderWithRouter(
      <Pokemon pokemon={information} isFavorite={false} />,
    );
    const img = getAllByAltText(`${information.name} sprite`);
    expect(img[0].src).toBe(information.image);
  });

  it('link para detalhes', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={information} isFavorite={false} />,
    );
    const link = getByText('More details');
    expect(link.href).toMatch(`/pokemons/${information.id}`);
  });

  it('Ao clicar em "More details" deve ir para página de detalhes', () => {
    const { history, getByText } = renderWithRouter(
      <Pokemon pokemon={information} isFavorite={false} />,
    );
    const link = getByText('More details');
    fireEvent.click(link);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toMatch(`/pokemons/${information.id}`);
  });

  it('estrela imagem favorito', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={information} isFavorite />,
    );
    const img = getByAltText(`${information.name} is marked as favorite`);
    expect(img).toBeInTheDocument();
  });

  it('o icone deve ser /star-icon.svg', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={information} isFavorite />,
    );
    const img = getByAltText(`${information.name} is marked as favorite`);
    expect(img.src).toMatch(/\/star-icon.svg/);
  });
});

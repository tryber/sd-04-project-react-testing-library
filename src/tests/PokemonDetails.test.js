import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../helpers/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import data from '../data';

const favoriteById = { 25: true };
const match = { params: { id: `${data[0].id}` } };
const onUpdate = jest.fn();

describe('Testes do arquivo PokemonDetails.js', () => {
  afterEach(cleanup);
  it('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={favoriteById}
        pokemons={data}
        onUpdateFavoritePokemons={onUpdate}
      />,
    );
    const nome = getByText(`${data[0].name} Details`);
    expect(nome).toBeInTheDocument();
  });

  it('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { queryByText } = renderWithRouter(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={favoriteById}
        pokemons={data}
        onUpdateFavoritePokemons={onUpdate}
      />,
    );
    const moreDetails = queryByText('More details');
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={favoriteById}
        pokemons={data}
        onUpdateFavoritePokemons={onUpdate}
      />,
    );
    const heading = getByText(/Summary/i);
    expect(heading.tagName).toBe('H2');
    expect(heading).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={favoriteById}
        pokemons={data}
        onUpdateFavoritePokemons={onUpdate}
      />,
    );
    const paragraph = getByText(data[0].summary);
    expect(paragraph).toBeInTheDocument();
  });

  it('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={favoriteById}
        pokemons={data}
        onUpdateFavoritePokemons={onUpdate}
      />,
    );
    const allImages = getAllByAltText(`${data[0].name} location`);
    data[0].foundAt.forEach(({ location, map }) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(allImages.some(({ src }) => src === map)).toBeTruthy();
    });
  });

  it('A página de detalhes deve permitir favoritar um pokémon', () => {
    const { getByLabelText } = renderWithRouter(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={favoriteById}
        pokemons={data}
        onUpdateFavoritePokemons={onUpdate}
      />,
    );
    const checkBox = getByLabelText(/Pokémon favoritado/i);
    expect(checkBox).toBeInTheDocument();
    fireEvent.click(checkBox);
    expect(onUpdate).toBeCalled();
  });
});

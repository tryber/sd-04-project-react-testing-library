import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

afterEach(cleanup);

describe('PokemonDetails tests', () => {
  const pok = pokemons[0];
  const match = {
    params: {
      id: String(pok.id),
    },
  };
  const favorite = { 25: false };
  test('The page should contain a text with the pokemon"s name.', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={favorite}
        match={match}
        pokemons={pokemons}
      />,
    );
    expect(getByText(`${pok.name} Details`)).toBeDefined();
  });

  // test('There should be no link to details.', () => {
  //   const { container, getByText } = renderWithRouter(
  //     <PokemonDetails
  //       isPokemonFavoriteById={favorite}
  //       match={match}
  //       pokemons={pokemons}
  //     />,
  //   );
  //   console.log(container.querySelector('.pokemon'));
  //   // expect(container.querySelector('.pokemon')).toBeDefined();
  //   expect(getByText(/More details/i)).not.toBeDefined();
  // });

  test('There must be an h2 with the summary text.', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={favorite}
        match={match}
        pokemons={pokemons}
      />,
    );
    expect(getByText(/Summary/i).tagName).toBe('H2');
  });

  test('There should be a paragraph with a summary about the pokemon.', () => {
    const { container } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={favorite}
        match={match}
        pokemons={pokemons}
      />,
    );
    expect(container.querySelector('section > p').innerHTML).toMatch('Pokémon');
  });

  test('There must be an h2 with the text of the pokemon"s location.', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={favorite}
        match={match}
        pokemons={pokemons}
      />,
    );
    expect(getByText(`Game Locations of ${pok.name}`)).toBeDefined();
  });

  test('There must be a name and an image of the location.', () => {
    const url1 = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const { getByText, getAllByAltText, container } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={favorite}
        match={match}
        pokemons={pokemons}
      />,
    );
    expect(getAllByAltText(`${pok.name} location`).length).toBe(2);
    const imgs = getAllByAltText(`${pok.name} location`);
    imgs.forEach((mapa) => {
      console.log(mapa.src);
      expect(mapa.src === url1 || mapa.src === url2).toBe(true);
    });
    expect(getByText('Kanto Viridian Forest')).toBeDefined();
    expect(getByText('Kanto Power Plant')).toBeDefined();
  });

  test('The checkbox label must be a "favorite Pokémon ?".', () => {
    // const url1 = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    // const url2 = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={favorite}
        match={match}
        pokemons={pokemons}
      />,
    );
    expect(getByText('Pokémon favoritado?')).toBeDefined();
  });
});

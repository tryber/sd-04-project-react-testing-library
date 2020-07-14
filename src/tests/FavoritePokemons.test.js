import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';
import Pokemons from '../data';

afterEach(cleanup);

const favIds = [78, 143, 148];
const getPokemonsIds = (names) => names.map((name) => Pokemons.find(
  (pokemon) => pokemon.name === name,
).id);

describe('Testes do arquivo FavoritePokemons.js', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    const noPokemons = getByText('No favorite pokemon found');
    expect(noPokemons).toBeInTheDocument();
  });

  test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={Pokemons.slice(0, 3)} />,
    );
    const pokeIds = getPokemonsIds(getAllByTestId('pokemon-name').map(
      (pokemonName) => pokemonName.textContent,
    ));
    expect(pokeIds).not.toEqual(favIds);
  });

  test('A página deve exibir cards de pokémons favoritados.', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={Pokemons.slice(6)} />,
    );
    const pokeIds = getPokemonsIds(getAllByTestId('pokemon-name').map(
      (pokemonName) => pokemonName.textContent,
    ));
    expect(pokeIds).toEqual(expect.arrayContaining(favIds));
  });
});

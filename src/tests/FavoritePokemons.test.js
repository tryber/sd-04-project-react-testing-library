import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

const favIds = [25, 4, 23];
const favPokemons = pokemons.filter((pokemon) => favIds.includes(pokemon.id));

describe('Tests on Favorites Pokémons page', () => {
  test('If the person does not have favorite Pokémon, the message No favorite pokemon found should appear on the screen.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('The page should not display any non-favored Pokémon cards.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={favPokemons} />);
    expect(queryByText('Snorlax, Dragonair')).not.toBeInTheDocument();
  });

  test('The page should display all favorite Pokémon cards', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={favPokemons} />);
    expect(queryByText('Pikachu', 'Ekans', 'Charmander')).toBeInTheDocument();
  });
});

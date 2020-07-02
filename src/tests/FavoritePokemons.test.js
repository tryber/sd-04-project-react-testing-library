import React from 'react';
import { cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

afterEach(cleanup);

const favoritesPokemons = pokemons.filter((pokemon) => [25, 4, 10].includes(pokemon.id));

describe('Testando FavoritePokemons', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    const titleText = getByText(/No favorite pokemon found/i);
    expect(titleText).toBeInTheDocument();
  });
  test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { container } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    const divTag = container.querySelector('.favorite-pokemons');
    expect(divTag).not.toBeInTheDocument();
  });
  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { getAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={favoritesPokemons} />);
    const test = getAllByTestId('pokemon-name');
    expect(test.length).toBe(3);
  });
});

import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const favoritePokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [[Object], [Object]],
    summary:
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: { value: '8.5', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [[Object], [Object], [Object], [Object]],
    summary:
      'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: { value: '6.9', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [[Object]],
    summary:
      'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  },
];

describe('Requisito 3', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
    expect(queryByText('Snorlax', 'Dragonair')).not.toBeInTheDocument();
  });

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
    expect(queryByText('Pikachu', 'Charmander', 'Ekans')).toBeInTheDocument();
  });
});

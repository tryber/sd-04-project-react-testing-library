import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import Pokedex from '../components/Pokedex';

const pokeMock = [
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

describe('requisito 5', () => {
  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista;', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokeMock} isPokemonFavoriteById={25} />,
    );
    const h2 = document.querySelector('h2');
    const heading = getByText('Encountered pokémons');
    expect(h2).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokeMock} isPokemonFavoriteById={25} />,
    );

    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeInTheDocument();
  });
});

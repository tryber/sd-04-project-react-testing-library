import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const pokemonTest = [
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo:
      'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map:
          'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary:
      'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
];

describe('Testing Favorite Pokémons', () => {
  afterEach(cleanup);
  it('Caso a pessoa não tenha pokémons favoritos, mostra No favorite pokemon found ', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { queryByTestId } = renderWithRouter(<FavoritePokemons />);
    const noCard = queryByTestId('pokemon-name');
    expect(noCard).not.toBeInTheDocument();
  });

  it('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { queryByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={pokemonTest} />,
    );
    const showCard = queryByTestId('pokemon-name');
    expect(showCard.innerHTML).toBe('Charmander');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

const favPokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
}];

test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
  const { getByText } = render(<FavoritePokemons />);
  const noFav = getByText('No favorite pokemon found');
  expect(noFav).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
  const { queryByTestId } = render(<FavoritePokemons />);
  const noCard = queryByTestId('pokemon-name');
  expect(noCard).not.toBeInTheDocument();
});

test('A página deve exibir todos os cards de pokémons favoritados;', () => {
  const { getByTestId } = render(<FavoritePokemons pokemons={favPokemons} />);
  const Card = getByTestId('pokemon-name');
  expect(Card).toBe('Pikachu');
});

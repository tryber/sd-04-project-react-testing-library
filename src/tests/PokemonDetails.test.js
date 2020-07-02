import React from 'react';
import { createMemoryHistory } from 'history';

import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do arquivo PokemonDetails.js', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { getByText, getAllByAltText } = renderWithRouter(<App />, { history });

    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    expect(
      getByText(
        'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
      ),
    ).toBeInTheDocument();

    const images = getAllByAltText('Pikachu location');
    expect(images[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
});

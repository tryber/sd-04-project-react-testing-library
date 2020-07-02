import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do arquivo PokemonDetails.js', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const { getByText, queryByText, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = queryByText('More details');
    fireEvent.click(moreDetails);
    setTimeout(() => {
      expect(getByText('Pikachu Details')).toBeInTheDocument();
      expect(moreDetails).toBeFalsy();
      expect(getByText('Summary')).toBeInTheDocument();
      expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
      expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
      const images = getAllByAltText('Pikachu location');
      expect(images[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    }, 1000);
  });
});

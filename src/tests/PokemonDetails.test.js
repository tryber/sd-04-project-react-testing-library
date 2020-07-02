import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do arquivo PokemonDetails.js', () => {
  test('show pokemon name', () => {
    pokemons.forEach(({ name }) => {
      const { getByText, queryByText } = renderWithRouter(<App />);
      const moreDetails = queryByText('More details');
      fireEvent.click(moreDetails);
      setTimeout(() => {
        expect(getByText(name)).toBeInTheDocument();
        expect(moreDetails).toBeFalsy();
        expect(getByText('Summary').tagName).toBe('H2');
      }, 1000);
    });
  });
});

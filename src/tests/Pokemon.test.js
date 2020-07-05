import React from 'react';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';
import { getByText } from '@testing-library/react';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
};

describe('Requisito 6, Pokemon', () => {
  test('O nome correto do pokémon deve aparecer na tela;', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
  test('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> ', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const average = `Average weight:${pokemon.averageWeight.value}${pokemon.averageWeight.measurementUnit}`;
    expect(getByTestId('pokemon-weight').textContent).toBe(average);
  });
});

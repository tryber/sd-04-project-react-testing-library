import React from 'react';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';
import { fireEvent } from '@testing-library/react';
import pokemons from '../data';

describe('Requisito  5, Pokedex', () => {
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnNext = getByText('Próximo pokémon');
    expect(btnNext).toBeInTheDocument();
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
    fireEvent.click(btnNext);
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[1].name);
  });
});

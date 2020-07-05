import React from 'react';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';
import { fireEvent, getByTestId } from '@testing-library/react';
import pokemons from '../data';

describe('Requisito  5, Pokedex', () => {
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnNext = getByText('Próximo pokémon');
    expect(btnNext).toBeInTheDocument();
    pokemons.forEach((e) => {
      expect(getByTestId('pokemon-name').textContent).toBe(e.name);
      fireEvent.click(btnNext);
    });
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
  });
});

describe('Apenas um pokemon por vez', () => {
  test('Um pokemon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const numeroDiv = getAllByTestId('pokemon-name').length;
    expect(numeroDiv).toBe(1);
  });
});

describe('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;', () => {
  test('Botões de type', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const btnType = getAllByTestId('pokemon-type-button')[2];
    fireEvent.click(btnType);
    const type = getByTestId('pokemonType').textContent;
    expect(btnType.textContent).toBe(type);
  });
});

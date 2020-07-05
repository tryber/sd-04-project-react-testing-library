import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';
import pokemons from '../data';

describe('Requisito  5, Pokedex', () => {
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnNext = getByText('Próximo pokémon');
    expect(btnNext).toBeInTheDocument();
    pokemons.forEach((elemento) => {
      expect(getByTestId('pokemon-name').textContent).toBe(elemento.name);
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

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('Botões de Botão ALL', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnAll = getByText(/All/i);
    expect(btnAll).toBeInTheDocument();
    const btnNext = getByText('Próximo pokémon');
    fireEvent.click(btnAll);
    pokemons.forEach((e) => {
      expect(getByTestId('pokemon-name').textContent).toBe(e.name);
      fireEvent.click(btnNext);
    });
  });
});

describe('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
  test('Todos Tipos', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const btnAllType = getAllByTestId('pokemon-type-button').map((e) => e.textContent);
    const btnNext = getByText('Próximo pokémon');
    const arr = [];
    pokemons.forEach((e) => {
      if (!arr.includes(e.type)) return arr.push(e.type);
      fireEvent.click(btnNext);
      return arr;
    });
    expect(btnAllType).toEqual(arr);
  });
});

describe('Botão Desabilitado', () => {
  test('Btn Desabilitado', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Dragon/i));
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
    expect(getByTestId('next-pokemon').disabled).toBeTruthy();
  });
});

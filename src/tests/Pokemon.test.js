import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokémon tests', () => {
  test('Informações no card do Pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  });

  test('Nome correto do Pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nome = getByTestId('pokemon-name');
    expect(nome.textContent).toBe(pokemons[0].name);
  });

  test('Pokémon peso', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const firstPok = pokemons[0].averageWeight;
    expect(getByTestId('pokemon-weight').innerHTML).toBe(
      `Average weight:${firstPok.value}${firstPok.measurementUnit}`,
    );
  });

  test('Imagem Pokémon', () => {
    const { container } = renderWithRouter(<App />);
    const imagem = container.querySelector('img');
    expect(imagem.src).toBe(pokemons[0].image);
    expect(imagem.alt).toBe(`${pokemons[0].name} sprite`);
  });

  test('Link navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('More details').href).toMatch(`/pokemons/${pokemons[0].id}`);
  });

  test('Clicar no link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Pokémons Favoritos Star', () => {
    const { getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    expect(container.querySelector('img + img').src).toMatch('/star-icon.svg');
    expect(container.querySelector('img + img').alt).toMatch(
      `${pokemons[0].name} is marked as favorite`,
    );
  });
});

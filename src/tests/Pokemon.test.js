import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../components/renderWithRouter';
import { getByText, getAllByTestId, fireEvent } from '@testing-library/react';

describe('testando componente pokemon', () => {
  test('testando peso', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const peso = getByTestId(/pokemon-weight/i);
    expect(peso.innerHTML).toBe(`Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`);
  });
  test('testando tipo', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const tipo = getByTestId(/pokemonType/i);
    expect(tipo.innerHTML).toBe(`${pokemons[0].type}`);
  });
  test('testando nome', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const tipo = getByTestId(/pokemon-name/i);
    expect(tipo.innerHTML).toBe(`${pokemons[0].name}`);
  });
  test('testando imagem', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const img = getByAltText(`${pokemons[0].name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', `${pokemons[0].image}`);
  });
  test('testando estrela', () => {
    const { getByAltText, getByText, history } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    history.push(`/pokemons/${pokemons[0].id}`);
    const botao1 = getByText(/Pokémon favoritado/i);
    const botao2 = getByText(/Home/i);
    fireEvent.click(botao1);
    fireEvent.click(botao2);
    const estrela = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(estrela).toHaveAttribute('src', '/star-icon.svg');
    expect(estrela).toBeInTheDocument();
  });
  test('testando link', () => {});
});
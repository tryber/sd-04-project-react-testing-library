import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('Requirement 6', () => {
  it('O nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name').innerHTML;
    expect(name).toBe(data[0].name);
  });
  it('O peso médio do pokémon deve ser exibido com um texto no formato...', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId('pokemon-weight').innerHTML;
    expect(weight).toBe(`Average weight:${data[0].averageWeight.value}${data[0].averageWeight.measurementUnit}`);
  });
  it('A imagem deve conter um atributo src com a URL da imagem do pokémon.', () => {
    renderWithRouter(<App />);
    const image = document.querySelector('img');
    expect(image.src).toBe(data[0].image);
    expect(image.alt).toBe(`${data[0].name} sprite`);
  });
  it('O pokémon exibido na Pokédex deve conter um link de navegação...', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const path = history.location.pathname;
    expect(path).toBe(`/pokemons/${data[0].id}`);
  });
  it('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    const img = document.querySelector('.favorite-icon');
    expect(img.src).toMatch('star-icon.svg');
    expect(img.alt).toBe(`${data[0].name} is marked as favorite`);
  });
});

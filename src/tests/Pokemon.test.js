import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

afterEach(cleanup);

describe('Testes do arquivo Pokemon.js', () => {
  test('Deve ser retornado um card com as informações de determinado pokémon;', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).tobeInTheDocument();
    expect(getByTestId('pokemonType')).tobeInTheDocument();
    expect(getByTestId('pokemon-weight')).tobeInTheDocument();
  });
  test('O nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
  });
  test('O peso médio do pokémon deve ser exibido com um texto no formato correto', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const text = `Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`;
    expect(getByTestId('pokemon-weight').textContent).toBe(text);
  });
  test('A imagem deve conter um atributo src com a URL da imagem do pokémon e um atributo alt', () => {
    const { container } = renderWithRouter(<App />);
    const imgTag = container.querySelector('img');
    const imgURL = pokemons[0].image;
    expect(imgTag).toHaveAttribute('src', imgURL);
    expect(imgTag).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
  });
});

describe('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon.', () => {
  test('O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido', () => {
    const { getByText } = renderWithRouter(<App />);
    const textDetails = getByText(/More details/i);
    expect(textDetails.href).toMatch(`pokemons/${pokemons[0].id}`);
  });
  test('Ao clicar no link, a aplicação deve ser redirecionada para a página de detalhes de pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const textDetails = getByText(/More details/i);
    fireEvent.click(textDetails);
    const text = getByText(`${pokemons[0].name} Details`);
    expect(text).toBeInTheDocument();
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
});

describe('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  test('A imagem deve conter um atributo src e um atributo alt', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const textDetails = getByText(/More details/i);
    fireEvent.click(textDetails);
    const textFavorite = getByText(/Pokémon favoritado/i);
    fireEvent.click(textFavorite);
    const imgStar = container.querySelector('.favorite-icon');
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import Pokemons from '../data';

afterEach(cleanup);

describe('Testando pagina Pokemon', () => {
  test('Deve ser retornado um card com as informações de determinado pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  });

  test('Testando nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
  });

  test('Testando peso médio do pokémon deve ser no formato `Average weight', () => {
    const { getByTestId } = renderWithRouter(<App />);
    Pokemons.forEach((poke) => {
      expect(getByTestId('pokemon-weight')).toBeInTheDocument(`Average weight:${poke.averageWeight.value}${poke.averageWeight.measurementUnit}`);
    });
  });

  test('Testandoo imagem pokémon', () => {
    const { getByAltText } = renderWithRouter(<App />);

    expect(getByAltText(`${Pokemons[0].name} sprite`)).toHaveAttribute('src', Pokemons[0].image);
    expect(getByAltText(`${Pokemons[0].name} sprite`)).toHaveAttribute('alt', `${Pokemons[0].name} sprite`);
  });

  test('Testando link Detalhes pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    expect(moreDetails.href).toMatch(`/pokemons/${Pokemons[0].id}`);
  });

  test('Testando link de navegação do pokémon, para a página de detalhes de pokémon', () => {
    renderWithRouter(<Pokemon pokemon={Pokemons[0]} />);
    const path = `/pokemons/${Pokemons[0].id}`;
    expect(document.querySelector('a').href.includes(path)).toBeTruthy();
  });

  test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    renderWithRouter(<Pokemon pokemon={Pokemons[0]} isFavorite />);
    expect(document.querySelector('.favorite-icon').src.includes('/star-icon.svg')).toBeTruthy();
    expect(document.querySelector('.favorite-icon').alt).toBe(`${Pokemons[0].name} is marked as favorite`);
  });
});

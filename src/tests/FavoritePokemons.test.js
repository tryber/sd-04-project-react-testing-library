import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render, fireEvent, queryByText } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testes do arquivo FavoritePokemons.js', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <FavoritePokemons pokemons={[]} />
      </Router>,
    );
    const favoriteHeading = getByText('No favorite pokemon found');
    expect(favoriteHeading).toBeInTheDocument();
  });
  test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const history = createMemoryHistory();
    const { queryByText } = render(
      <Router history={history}>
        <FavoritePokemons pokemons={pokemons.slice(0,1)} />
      </Router>,
    );
    const nonExistentPokemonOne = queryByText('Caterpie');
    const nonExistentPokemonTwo = queryByText('Ekans');
    expect(nonExistentPokemonOne).not.toBeInTheDocument();
    expect(nonExistentPokemonTwo).not.toBeInTheDocument();
  });

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const history = createMemoryHistory();
    const { queryByText } = render(
      <Router history={history}>
        <FavoritePokemons pokemons={pokemons.slice(0,2)} />
      </Router>,
    );
    const existentPokemonOne = queryByText('Pikachu');
    const existentPokemonTwo = queryByText('Charmander');
    expect(existentPokemonOne).toBeInTheDocument();
    expect(existentPokemonTwo).toBeInTheDocument();
  });
});

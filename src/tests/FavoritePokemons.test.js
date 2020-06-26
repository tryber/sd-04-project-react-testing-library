import { fireEvent } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';

describe('Requisito 3, FavoritePokemons.test', () => {
  test('Caso não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
  test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { getByText } = renderWithRouter(<App />);
    const moredetails = getByText(/More details/i);
    fireEvent.click(moredetails);
    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    const classPokemon = document.querySelectorAll('.pokemon');
    expect(classPokemon.length).toBe(1);
  });
});

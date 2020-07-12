import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Requirement 3', () => {
  it('Caso a pessoa não tenha pokémons favoritos, a mensagem deve aparecer na tela.', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/favorites' });
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
  it('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const pokemon = document.querySelectorAll('.favorite-pokemons');
    expect(pokemon.length).toBe(0);
  });
  it('A página deve exibir todos os cards de pokémons favoritados;', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const pokemon = document.querySelectorAll('.favorite-pokemons');
    expect(pokemon).toBeDefined();
  });
});

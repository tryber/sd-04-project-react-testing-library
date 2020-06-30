import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Favorite from '../components/FavoritePokemons';

describe('Testes do arquivo FavoritePokemons.js', () => {
  afterEach(cleanup);

  test('Exibir "No favorite pokemon found" caso não tenha favoritos', () => {
    const { getByText } = render(<Favorite />);
    const el = getByText(/No favorite pokemon found/);
    expect(el).toBeInTheDocument();
  });

  test('A página não deve exibir nenhum card de pokémon não favoritado', () => {
    const idPikachu = 25;
    
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={[`/pokemons/${idPikachu}`]}>
        <App />
      </MemoryRouter>,
    );

    const elInp = getByLabelText(/Pokémon favoritado?/);
    expect(elInp.checked).toBe(false);

    const elLink = getByText(/Favorite Pokémons/);
    fireEvent.click(elLink);

    const txNoFound = getByText(/No favorite pokemon found/);
    expect(txNoFound).toBeInTheDocument();
  })

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const idPikachu = 25;
    
    const { getByLabelText, getByText, getByTestId } = render(
      <MemoryRouter initialEntries={[`/pokemons/${idPikachu}`]}>
        <App />
      </MemoryRouter>,
    );

    const elInp = getByLabelText(/Pokémon favoritado?/);
    fireEvent.click(elInp);
    expect(elInp.checked).toBe(true);

    const elLink = getByText(/Favorite Pokémons/);
    fireEvent.click(elLink);

    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');
    expect(name).toBeInTheDocument();
  })
});

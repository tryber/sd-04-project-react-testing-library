import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testando o FavoritePokemons', () => {
  afterEach(cleanup);

  test('Caso a pessoa não tenha pokémons favoritos, a mensagem `No favorite pokemon found` deve aparecer na tela', () => {
    const { getByText } = render(<FavoritePokemons />);
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

    const a = getByLabelText(/Pokémon favoritado?/);
    expect(a.checked).toBe(false);

    const elLink = getByText(/Favorite Pokémons/);
    fireEvent.click(elLink);

    const whitouTxt = getByText(/No favorite pokemon found/);
    expect(whitouTxt).toBeInTheDocument();
  });

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const idPikachu = 25;

    const { getByLabelText, getByText, getByTestId } = render(
      <MemoryRouter initialEntries={[`/pokemons/${idPikachu}`]}>
        <App />
      </MemoryRouter>,
    );

    const a = getByLabelText(/Pokémon favoritado?/);
    fireEvent.click(a);
    expect(a.checked).toBe(true);

    const elLink = getByText(/Favorite Pokémons/);
    fireEvent.click(elLink);

    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });
});

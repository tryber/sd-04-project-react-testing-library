import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verificando paths', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Home').closest('a')).toHaveAttribute('href', '/');
  expect(getByText('About').closest('a')).toHaveAttribute('href', '/about');
  expect(getByText('Favorite Pokémons').closest('a')).toHaveAttribute('href','/favorites');
});
test('Verificando rota', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const incio = getByText(/About/i);
  expect(incio).toBeInTheDocument();
  fireEvent.click(incio);
  const sobre = getByText(/About Pokédex/i);
  expect(sobre).toBeInTheDocument();
  const pokemonFavorito = getByText(/Favorite/i);
  expect(pokemonFavorito).toBeInTheDocument();
  fireEvent.click(pokemonFavorito);
  const redireciona = getByText(/Favorite Pokémons/i);
  expect(redireciona).toBeInTheDocument();
});

describe('Testando  Página Perdida', () => {
  test('Página não encontrada ', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/nao-existe' });
    const pagPerdida = getByText(/not found/i);
    expect(pagPerdida).toBeInTheDocument();
  });
});

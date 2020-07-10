import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testes do arquivo App.js', () => {
  test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favorite = getByText(/Favorite Pokémons/i);
    expect(home).toHaveAttribute('href', '/');
    expect(about).toHaveAttribute('href', '/about');
    expect(favorite).toHaveAttribute('href', '/favorites');
  });

  test('Link "Home" redireciona para a página inicial, na URL "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Link "About" redireciona para a página de About, na URL "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Link "Favorite Pokémons" redireciona para a página de pokémons favoritados, na URL "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Entrar em uma URL desconhecida exibe a página "Not Found"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});

/* fireEvent.click(getByText(/Sobre/i));
const pathname = history.location.pathname;
expect(pathname).toBe('/about'); */

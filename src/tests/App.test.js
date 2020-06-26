import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testes do arquivo App.js', () => {
  test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada.', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
    const homeHeading = getByText(/Encountered pokémons/);
    expect(homeHeading).toBeInTheDocument();
  });
  test('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const linkHome = getByText(/Home/);
    const linkAbout = getByText(/About/);
    const linkFavPokemon = getByText(/Favorite Pokémons/);
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavPokemon).toBeInTheDocument();
  });

  test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const linkHome = getByText(/Home/);
    fireEvent.click(linkHome);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const linkAbout = getByText(/About/);
    fireEvent.click(linkAbout);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });

  test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const linkFavPokemon = getByText(/Favorite Pokémons/);
    fireEvent.click(linkFavPokemon);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });

  test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const history = createMemoryHistory();
    history.push('/non-exist');
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const heading404 = getByText(/Page requested not found/);
    expect(heading404).toBeInTheDocument();
  });
});

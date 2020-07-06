import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('1. testes do arquivos App.js', () => {
  test('testado `Home` e se redireciona corretamente', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const Home = getByText(/Home/i);
    expect(Home).toBeInTheDocument();
    fireEvent.click(Home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('testado `About` e se redireciona corretamente', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const About = getByText(/About/i);
    expect(About).toBeInTheDocument();
    fireEvent.click(About);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('testando `Favorite Pokémon` e se redirecionan corretamente', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const FavPok = getByText(/Favorite Pokémons/i);
    expect(FavPok).toBeInTheDocument();
    fireEvent.click(FavPok);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testes do arquivo App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('primeiro link deve possuir o texto Home com a URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('o segundo link deve possuir o texto about com a URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });

  test('shows the Pokédex when the route is `/about`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });

  test('shows the Favorite  when the route is `/favorites`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/xablau']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});

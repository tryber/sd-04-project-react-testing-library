import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);
  const text = getByText('Encountered pokémons');
  expect(text).toBeInTheDocument();
});

describe('Requirement 1', () => {
  it('O primeiro link deve possuir o texto Home com a URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });
  it('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/about/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });
  it('Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/failRoute' });
    expect(getByText(/not found/i)).toBeInTheDocument();
  });
});

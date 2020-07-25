import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testando App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);

    expect(heading).toBeInTheDocument();
  });

  test('Testando os links', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorita = getByText('Favorite Pokémons');

    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorita.href).toBe('http://localhost/favorites');
  });

  test('Testando os link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    const palavraFromHome = getByText('Encountered pokémons');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
    expect(palavraFromHome).toBeInTheDocument();
  });

  test('Testando os link about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');
    const palavraFromAbout = getByText(/About/i);

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    expect(palavraFromAbout).toBeInTheDocument();
  });

  test('Testando os link favorita', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorita = getByText('Favorite Pokémons');
    const palavraFromFav = getByText(/favorite/i);

    fireEvent.click(favorita);
    expect(history.location.pathname).toBe('/favorites');
    expect(palavraFromFav).toBeInTheDocument();
  });

  test('Testando os link favorita', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/rotaTestNotFound' });
    const palavraFromPageNotFound = getByText('Page requested not found');

    expect(palavraFromPageNotFound).toBeInTheDocument();
  });
});

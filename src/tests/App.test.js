import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testa App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Verificando links no topo da pagina', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();

    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
  });

  test('Testando links "Home", "About" e "Favoritos"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    // Clica no link home
    fireEvent.click(getByText(/Home/i));
    const pathHome = history.location.pathname;
    expect(pathHome).toBe('/');

    // Clica no link about
    fireEvent.click(getByText(/About/i));
    const pathAbout = history.location.pathname;
    expect(pathAbout).toBe('/about');

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathFavorite = history.location.pathname;
    expect(pathFavorite).toBe('/favorites');
  });

  test('Testando Page not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});

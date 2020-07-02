import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Iniciando testes com o arquivo App.js', () => {
  afterEach(cleanup);

  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Navegando no Link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homePage = getByText(/Home/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(homePage);
    expect(history.location.pathname).toBe('/');
  });

  test('Navegando no Link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const AboutPage = getByText(/About/i);
    expect(AboutPage).toBeInTheDocument();

    fireEvent.click(AboutPage);
    expect(history.location.pathname).toBe('/about');
  });

  test('Navegando no Link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const FavoritePage = getByText(/Favorite Pokémons/i);
    expect(FavoritePage).toBeInTheDocument();

    fireEvent.click(FavoritePage);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('testando pagina nao encontrada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/qualquer-rota';
    history.push(route);

    expect(getByText(/Not Found/i)).toBeInTheDocument();
  });
});

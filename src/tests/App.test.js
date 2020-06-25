import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

afterEach(cleanup);

describe('primeiro requesito', () => {
  it('ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('o primeiro link deve possuir o texto Home com a URL / e redirecionar à página correta', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    // expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('o segundo link deve possuir o texto About com a URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    // expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('o terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    // expect(getByText(/Favorite Pokemos/i)).toBeInTheDocument();
  });

  it('entrar em uma URL desconhecida exibe a página Not Found', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/bad/route' });
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});

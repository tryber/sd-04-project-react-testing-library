import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('teste da App', () => {
  test('Testar página principal  URL “/”', () => {
    const { history } = renderWithRouter(<App />);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  test('Testar renderização do Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  test('Testar renderização do About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/About/i)).toBeInTheDocument();
    fireEvent.click(getByText(/About/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });

  test('Testar renderização do Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });

  test('Testar renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Requisito 1', () => {
  afterEach(cleanup);

  test('A URL "/" é a Página principal', () => {
    const { history } = renderWithRouter(<App />);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('Render Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    fireEvent.click(getByText('Home'));
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('Render About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('About')).toBeInTheDocument();
    fireEvent.click(getByText('About'));
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  test('Render Favorite', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
    fireEvent.click(getByText('Favorite Pokémons'));
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  test('Render Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/bicho-piruleta');
    const path = getByText('Page requested not found');
    expect(path).toBeInTheDocument();
  });
});

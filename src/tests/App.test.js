import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Tests on App.js file', () => {
  test('renders a reading with the text "Pokédex"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText('Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('Shows the Pokédex when the route is "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Shows Home link when route is "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  test('Shows About link when route is "/about"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('About')).toBeInTheDocument();
  });

  test('Shows Favorite Pokémons link when the route is "/favorites"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Testing Routes', () => {
  test('Navigating to Home page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });

  test('Navigating to About page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });

  test('Navigating to Favorite Pokémons page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Navigating to a not existent page', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/not-found' });
    expect(getByText(/not found/i)).toBeInTheDocument();
  });
});

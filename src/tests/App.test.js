import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('App tests', () => {
  test('shows Pokedéx main page on `/` route', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText("Pokédex")).toBeInTheDocument();
  });

  test('render Home link with `/` URL', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument;
  });

  test('render About link with `/about` URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument;
    fireEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('render Favorite Pokémons link with `/favorites` URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritesLink = getByText(/Favorite Pokémons/i);
    expect(favoritesLink).toBeInTheDocument;
    fireEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('render NotFound page when URL do not match', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push("/page/not-found");
    expect(getByText(/Not Found/i)).toBeInTheDocument;
  });

});
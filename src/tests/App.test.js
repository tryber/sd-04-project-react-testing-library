import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  test('links: Home, About and Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Home link goes to "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
    // expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('About link goes to "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/about');
    // expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('Favorite pokemons link goes to "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
    // expect(getAllByText(/Favorite pokémons/i).length).toBe(2);
  });

  test('Not found route', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/anything' });
    // fireEvent.click(getByText('favorites'));
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});

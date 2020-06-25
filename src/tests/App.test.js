import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  test('links: Home, About and Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Home', 'Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Home link goes to "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    // fireEvent.click(getByText('Home'));
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('About link goes to "/about"', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/about' });
    expect(getByText('About')).toBeInTheDocument();
    // fireEvent.click(getByText('About'));
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('Favorite pokemons link goes to "/favorites"', () => {
    const { getAllByText, getByText } = renderWithRouter(<App />, { route: '/favorites' });
    // fireEvent.click(getByText('favorites'));
    expect(getAllByText(/Favorite pokémons/i).length).toBe(2);
  });

  test('Not found route', () => {
    const { getAllByText, getByText } = renderWithRouter(<App />, { route: '/ffff' });
    // fireEvent.click(getByText('favorites'));
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpFunction';
import App from '../App';


describe('Test App component', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('test home page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pokedexText1 = getByText('Encountered pokémons');
    expect(pokedexText1).toBeInTheDocument();

    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
    expect(home).toBeInTheDocument();
    const pokedex = getByText(/Pokédex/i);
    expect(pokedex).toBeInTheDocument();
  });
  test('test about route', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
  });
  test('test favorites route', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteText = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteText);
    expect(history.location.pathname).toBe('/favorites');

    expect(favoriteText).toBeInTheDocument();
  });

  test('test not found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page/not-found/');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});

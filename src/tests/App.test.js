import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('App tests', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  test('renders Home, About and Favorite Pokémons Link', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  test('Does Home link go to the path / ?', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    expect(history.location.pathname).toBe('/');
  });

  test('Does About link go to path path /about ?', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
  });

  test('Does Favorite Pokémons link go to the path /favorites ?', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Passing a wrong path as URL, verify if a Not Found page renders.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const wrongURL = '/pokedox';
    history.push(wrongURL);
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});

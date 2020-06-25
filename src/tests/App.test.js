import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

afterEach(cleanup);

it('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Pokédex')).toBeInTheDocument();
});

it('renders navigation links', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});


it('redirects to "/" when clicked on "Home"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
  expect(getByText('Pokédex')).toBeInTheDocument;
});

it('redirects to "/about" when clicked on "About"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
  expect(getByText('About Pokédex')).toBeInTheDocument;
});

it('redirects to "/favorites" when clicked on "Favorite Pókemons"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
  expect(getByText('Favorite pokémons')).toBeInTheDocument;
});

it('renders the "Not Found" page when an URL is not found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/non/existing/page');
  expect(getByText('Page requested not found')).toBeInTheDocument;
});

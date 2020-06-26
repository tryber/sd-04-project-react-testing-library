import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('testando home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
  fireEvent.click(getByText(/Home/i));
  expect(history.location.pathname).toBe('/');
  const encontrado = getByText(/Encountered pokémons/);
  expect(encontrado).toBeInTheDocument();
});

test('testando About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const About = getByText(/About/i);
  expect(About).toBeInTheDocument();
  fireEvent.click(getByText(/About/i));
  expect(history.location.pathname).toBe('/about');
  const encontrado2 = getByText(/About Pokédex/);
  expect(encontrado2).toBeInTheDocument();
});

test('testando Favorite', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favorite = getByText(/Favorite Pokémons/i);
  expect(favorite).toBeInTheDocument();
  fireEvent.click(getByText(/Favorite Pokémons/i));
  expect(history.location.pathname).toBe('/favorites');
  const encontrado = getByText(/Favorite pokémons/);
  expect(encontrado).toBeInTheDocument();
});

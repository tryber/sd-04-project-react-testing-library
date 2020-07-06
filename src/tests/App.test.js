import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('shows the Home link when the route is `/` and your destination page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
});

test('shows the `About` link when the route is `/` and your destination page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
});

test('shows the `Favorite Pokémons` link when the route is `/` and your destination page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
});

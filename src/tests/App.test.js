import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './resource';

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('renders nav links', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const links = getAllByRole('link');
  expect(links[0].innerHTML).toMatch('Home');
  expect(links[0].getAttribute('href')).toBe('/');
  expect(links[1].innerHTML).toMatch('About');
  expect(links[1].getAttribute('href')).toBe('/about');
  expect(links[2].innerHTML).toMatch('Favorite Pokémons');
  expect(links[2].getAttribute('href')).toBe('/favorites');
});

test('routes should link to the correct adress', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  expect(history.location.pathname).toMatch('/');
  fireEvent.click(getByText(/About/i));
  expect(history.location.pathname).toMatch('/about');
  fireEvent.click(getByText(/Favorite Pokémons/i));
  expect(history.location.pathname).toMatch('/favorites');
});

test('landing on a bad page', () => {
  const { getByText } = renderWithRouter(<App />, {
    route: '/something-that-does-not-match',
  });
  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});

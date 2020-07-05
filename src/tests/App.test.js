import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
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

test('check if / redirects to Home', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Home/i));

  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
});

test('check if /about redirects to About', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/about/i));

  const about = getByText(/About Pokédex/i);
  expect(about).toBeInTheDocument();
});

test('check if /favorites redirects to Favorite Pokemon', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Favorite Pokémons/i));

  const favorite = getByText(/no favorite pokemon found/i);
  expect(favorite).toBeInTheDocument();
});

test('page not found', () => {
  const history = createMemoryHistory();
  const route = '/some route';
  history.push(route);
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});

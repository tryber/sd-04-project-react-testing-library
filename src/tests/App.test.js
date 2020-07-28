import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('testing Home Link', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
  fireEvent.click(home);
  expect(getByText(/Home/i)).toBeInTheDocument();
});

test('testing About Link', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();
  fireEvent.click(about);
  expect(getByText(/About/i)).toBeInTheDocument();
});

test('testing Favorite Pokémons Link', () => {
  const { getByText, getAllByText } = renderWithRouter(<App />);
  const favPokemon = getByText(/Favorite Pokémons/i);
  expect(favPokemon).toBeInTheDocument();
  fireEvent.click(favPokemon);
  expect(getAllByText(/Favorite Pokémons/i));
});

test('Verify if it is a valid page', () => {
  const history = createMemoryHistory();
  const route = '/route X';
  history.push(route);
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});

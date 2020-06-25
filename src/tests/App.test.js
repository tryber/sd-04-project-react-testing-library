import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Router history={history}>{ui}</Router>,
      history,
    ),
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

test('it tests the link Home and its route', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
  fireEvent.click(home);
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('it tests link About and its route', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();
  fireEvent.click(about);
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('it test link Favorite Pokémon and its route', () => {
  const { getByText, getAllByText } = renderWithRouter(<App />);
  const favorite = getByText(/Favorite Pokémons/i);
  expect(favorite).toBeInTheDocument();
  fireEvent.click(favorite);
  expect(getAllByText(/Favorite pokémons/i).length).toBe(2);
});

test('Verifies if a not found route exists', () => {
  const history = createMemoryHistory();
  const route = '/any-route';
  history.push(route);
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});

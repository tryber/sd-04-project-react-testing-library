import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  }
};

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Encountered pokémons/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('conjunto fixo de links de navegação', () => {
  const { getByText } = renderWithRouter(<App />);
  
  expect(getByText(/Home/i)).toBeInTheDocument();
  expect(getByText(/About/i)).toBeInTheDocument();
  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});

test('navegando para a página Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  
  fireEvent.click(getByText(/Home/i));

  expect(history.location.pathname).toBe('/');

  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('navegando para a página About', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/About/i));

  expect(history.location.pathname).toBe('/about');

  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('navegando para a página Favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Favorite Pokémons/i));

  expect(history.location.pathname).toBe('/favorites');

  expect(getByText('Favorite pokémons')).toBeInTheDocument();
});

test('navegando para uma rota inexistente', () => {
  const history = createMemoryHistory();
  const route = '/rota-inexistente';
  history.push(route);
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});

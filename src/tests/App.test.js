import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import App from '../App';
import { createMemoryHistory } from 'history';

jest.mock('react-router-dom', () => {
  const moduloOriginal = jest.requireActual('react-router-dom');
  return {
    ...moduloOriginal,
    BrowserRouter: ({ children }) => <div>{children}</div>,
  };
});

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history =
    routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

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

test('Teste se existe o botão home e se, ao clicar, redireciona para home page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText(/Home/);
  fireEvent.click(homeLink);
  expect(getByText(/Encountered pokémons/));
});

test('Teste se existe o botão About e se, ao clicar, redireciona para about page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = getByText(/About/);
  fireEvent.click(aboutLink);
  expect(getByText(/About Pokédex/));
});

test('Teste o botão Favorite Pokemons e se, ao clicar, redireciona para fav page ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favLink = getByText(/Favorite Pokémons/);
  fireEvent.click(favLink);
  expect(getByText(/Favorite pokémons/));
});
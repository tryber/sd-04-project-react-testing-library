import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Links', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  expect(nav).toBeInTheDocument();
});

test('Home', () => {
  const { getByText } = renderWithRouter(<App />);

  const pag = getByText('Pokédex');
  expect(pag).toBeInTheDocument();

  fireEvent.click(getByText(/Home/i));

  const homePage = getByText('Encountered pokémons');
  expect(homePage).toBeInTheDocument();
});

test('About', () => {
  const { getByText } = renderWithRouter(<App />);

  const pag = getByText('Pokédex');
  expect(pag).toBeInTheDocument();

  fireEvent.click(getByText(/About/i));

  const aboutPage = getByText('About Pokédex');
  expect(aboutPage).toBeInTheDocument();
});

test('Favorite Pokémons', () => {
  const { getByText } = renderWithRouter(<App />);

  const pag = getByText('Pokédex');
  expect(pag).toBeInTheDocument();

  fireEvent.click(getByText(/Favorite Pokémons/i));

  const favoritePage = getByText('Favorite pokémons');
  expect(favoritePage).toBeInTheDocument();
});

test('Not Found', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/aaa' });

  const pag = getByText('Page requested not found');
  expect(pag).toBeInTheDocument();
});

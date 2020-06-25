import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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
// seguindo o README
test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

jest.mock('react-router-dom', () => {
  const moduloOriginal = jest.requireActual('react-router-dom');
  return {
    ...moduloOriginal,
    BrouserRouter: ({ children }) => (<div>{children}</div>),
  };
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('App', () => {
  test('Testing link text and path ', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favorite = getByText(/Favorite Pokémons/i);
    expect(home).toBeInTheDocument();
    expect(home.pathname).toBe('/');
    expect(about).toBeInTheDocument();
    expect(about.pathname).toBe('/about');
    expect(favorite).toBeInTheDocument();
    expect(favorite.pathname).toBe('/favorites');
  });

  test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de `About`, na URL "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Entrar em uma URL desconhecida exibe a página `Not Found`', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/notfound' });
    const notFound = getByText(/Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});

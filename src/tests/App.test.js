import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderwithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Initial render', () => {
  test('should render home page on "/" path', () => {
    const { history } = renderWithRouter(<App />);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });
  test('should render home with "Pokedéx" text', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('Menu links', () => {
  test('should contain link with Home text and "/" path', () => {
    const { getByText } = renderWithRouter(<App />);
    const menu = getByText(/Home/i);

    expect(menu).toBeInTheDocument();

    expect(menu.getAttribute('href')).toBe('/');
  });
  test('should contain link with About text and "/about" path', () => {
    const { getByText } = renderWithRouter(<App />);
    const menu = getByText(/About/i);

    expect(menu).toBeInTheDocument();

    expect(menu.getAttribute('href')).toBe('/about');
  });
  test('should contain link with Favorite Pokémons text and "/about" path', () => {
    const { getByText } = renderWithRouter(<App />);
    const menu = getByText(/Favorite Pokémons/i);

    expect(menu).toBeInTheDocument();

    expect(menu.getAttribute('href')).toBe('/favorites');
  });
});

describe('Menu links redirections', () => {
  test('should redirect to "/" on Home click in menu', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const menu = getByText(/Home/i);

    expect(menu).toBeInTheDocument();

    fireEvent.click(menu);
    expect(history.location.pathname).toBe('/');
  });
  test('should redirect to "/about" on About click in menu', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const menu = getByText(/About/i);

    expect(menu).toBeInTheDocument();

    fireEvent.click(menu);
    expect(history.location.pathname).toBe('/about');
  });
  test('should redirect to "/favorites" on Favorite Pokémons click in menu', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const menu = getByText(/Favorite Pokémons/i);

    expect(menu).toBeInTheDocument();

    fireEvent.click(menu);
    expect(history.location.pathname).toBe('/favorites');
  });
});

describe('Not found page', () => {
  test('should render NotFound component on invalid url', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/WrongWayTurnBack');

    expect(getByTestId('not-found')).toHaveTextContent('Page requested not found');
  });
});

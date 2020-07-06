import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Set of links', () => {
  test('the first link - Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    // console.log(renderWithRouter(<App />).history.location);
    const home = getByText(/Home/i);
    fireEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(home).toBeInTheDocument();
  });
  test('the second link - About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    fireEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(about).toBeInTheDocument();
  });
  test('the third link - Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(favorite).toBeInTheDocument();
  });
  test('the fourth link - NotFound', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/some/bad/path');
    const notFound = getByText(/Page requested not found/i);

    expect(notFound).toBeInTheDocument();
  });
});

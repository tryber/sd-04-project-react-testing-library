import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Testing links', () => {
  test('shows link with text `Home` when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  test('shows link with text `About` when the route is `/about`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('About')).toBeInTheDocument();
  });

  test('shows link with text `Favorite Pokémons` when the route is `/favorites`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Testing routes', () => {
  test('Navigating to `Home`', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));
    expect(getByText('Home')).toBeInTheDocument();
  });

  test('Navigating to `About`', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('About'));
    expect(getByText('About')).toBeInTheDocument();
  });

  test('Navigating to `Favorite Pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Navigating to a page that does not exist', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/any-route' });

    expect(getByText(/Page requested /i)).toBeInTheDocument();
  });
});

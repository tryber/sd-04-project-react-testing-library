import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
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

describe('Testando rotas', () => {
  afterEach(cleanup);

  test('Testar página principal em "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const text = getByText(/Encountered pokémons/);
    expect(text).toBeInTheDocument();
  })

  test('Testar Home em "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const text = getByText(/Encountered pokémons/);
    fireEvent.click(getByText(/Home/i))
    expect(text).toBeInTheDocument();
  })

  test('Testar About em "/about"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    const text = getByText(/About Pokédex/);
    fireEvent.click(getByText(/^About$/))
    expect(text).toBeInTheDocument();
  })

  test('Testar Favorite Pokémons em "/favorites"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>
    );
    const text = getByText(/Favorite pokémons/);
    fireEvent.click(getByText(/Favorite Pokémons/))
    expect(text).toBeInTheDocument();
  })

  test('Testar "/not-found"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/not-found']}>
        <App />
      </MemoryRouter>
    );
    const text = getByText(/Page requested not found/);
    expect(text).toBeInTheDocument();
  })
});

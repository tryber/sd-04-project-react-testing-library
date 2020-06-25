import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Requisito 1', () => {
  afterEach(cleanup);

  test('A URL "/" é a Página principal', () => {
    const { history } = renderWithRouter(<App />);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });
});

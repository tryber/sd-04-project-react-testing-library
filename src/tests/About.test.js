import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('shows the About Pokédex when the route is `/about`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('shows first paragraph', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/about/i));

  const p1 = getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i);
  expect(p1).toBeInTheDocument();
});

test('shows second paragraph', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/about/i));

  const p2 = getByText(/One can filter Pokémons by type, and see more details for each one of them/i);
  expect(p2).toBeInTheDocument();
});

test('shows Pokedex image', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/about/i));

  const alt = getByAltText(/Pokédex/i);
  expect(alt).toBeInTheDocument();
});

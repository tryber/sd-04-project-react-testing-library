import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('show Próximo pokémon button', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Próximo pokémon')).toBeInTheDocument();
});

test('show next pokemon', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Próximo pokémon/i));

  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));

  const caterpie = getByText(/Caterpie/i);
  expect(caterpie).toBeInTheDocument();
});
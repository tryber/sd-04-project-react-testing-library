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

test('filter pokemon by type', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Psychic/i));

  const alakazam = getByText(/Alakazam/i);
  expect(alakazam).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));

  const mew = getByText(/Mew/i);
  expect(mew).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));

  expect(alakazam).toBeInTheDocument();
});

test('reset filter', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/All/i));

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));

  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();
});

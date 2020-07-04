import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
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
  const { getByText, getAllByTestId } = renderWithRouter(<App />);
  const pokemonType = screen.getByTestId('pokemonType');
  const typeButton = getByText(/Psychic/i)
  fireEvent.click(typeButton);

  expect(pokemonType).toHaveTextContent('Psychic');
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

test('disable button if there just one pokemon', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Dragon/i));

  const dragonair = getByText(/Dragonair/i);
  expect(dragonair).toBeInTheDocument();

  const nxtBtn = getByText(/Próximo pokémon/i);
  expect(nxtBtn.disabled).toBeTruthy();
});

test('Encountered pokémons must be on the page', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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

test('testing Home Link', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i)
  expect(getByText).toBeInTheDocument(); 
});

test('testing About Link', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText(/About/i)
  expect(getByText).toBeInTheDocument(); 
});

test('testing Favorite Pokémons Link', () => {
  const { getByText } = renderWithRouter(<App />);
  const favPokemon = getByText(/Favorite Pokémons/i)
  expect(getByText).toBeInTheDocument(); 
});

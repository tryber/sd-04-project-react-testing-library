import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('shows Pokedéx main page on `/` route', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText("Pokédex")).toBeInTheDocument();
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('show pokemon details when More details button is clicked', () => {
  const { getByText } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i)
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  
  const pokeDetails = getByText(/Pikachu Details/i)
  expect(pokeDetails).toBeInTheDocument();
});

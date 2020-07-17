import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />, '/about');
  const info = getByText(/digital encliclopedia containing all Pokémons/i);

  expect(info).toBeInTheDocument();
});
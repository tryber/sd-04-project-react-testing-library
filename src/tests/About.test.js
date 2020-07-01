import React from 'react';
import { cleanup, render } from '@testing-library/react'
import About from '../components/About';

afterEach(cleanup);

it('should render a heading with the page title', () => {
  const { getByText } = render(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

it('should render the first paragraph with info about the Pokédex', () => {
  const { getByText } = render(<About />);
  expect(getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons')).toBeInTheDocument();
});

it('should render the second paragraph with info about the Pokédex', () => {
  const { getByText } = render(<About />);
  expect(getByText('One can filter Pokémons by type, and see more details for each one of them')).toBeInTheDocument();
});

it('should render an image of a Pokédex', () => {
  const { getByAltText } = render(<About />);
  expect(getByAltText('Pokédex')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
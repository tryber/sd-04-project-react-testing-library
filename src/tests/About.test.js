import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('About page tests', () => {
  it.skip('shows info about Pokedéx', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  it('should render h2 heading `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

});

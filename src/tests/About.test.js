import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Requirement 2', () => {
  it('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

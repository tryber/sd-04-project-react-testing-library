import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('About page tests', () => {
  it('should render h2 heading `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('should render two paragraphs about the Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('should render a Pokédex image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const { src } = getByAltText('Pokédex');
    expect(src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

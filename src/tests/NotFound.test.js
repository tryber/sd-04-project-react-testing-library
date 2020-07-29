import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Not Found page tests', () => {
  it('should render h2 heading with `Page requested not found`', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('should render a image of pikachu crying', () => {
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgAlt = 'Pikachu crying because the page requested was not found';
    const { getByAltText } = renderWithRouter(<NotFound />);
    const { src } = getByAltText(imgAlt);
    expect(src).toBe(imgSrc);
  });
});

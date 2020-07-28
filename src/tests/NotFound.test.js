import { within } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('test NotFound.js', () => {
  test('h2 - Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const header = document.querySelector('h2');
    expect(header).toBeInTheDocument();
    within(header).getByText('Page requested not found');
    within(header).getByText('😭');
  });

  test('Image Pikachu Crying', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const alt = getByAltText('Pikachu crying because the page requested was not found');
    const img = document.querySelector('img');
    expect(alt).toBeInTheDocument();
    expect(img.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

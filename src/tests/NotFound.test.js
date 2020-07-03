import React from 'react';
import renderWithoutRouter from '../services/renderWithoutRouter';
import NotFound from '../components/NotFound';

describe('test NotFound.js', () => {
  test('should find h2', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/not-found' });
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
    expect(notFound.tagName).toBe('H2');
  });

  test('NotFound image', () => {
    const { container } = renderWithRouter(<NotFound />, { route: '/not-found' });
    const img = container.querySelector('IMG');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

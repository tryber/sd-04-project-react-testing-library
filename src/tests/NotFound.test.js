import React from 'react';
import renderWithRouter from '../services/renderwithRouter';
import NotFound from '../components/NotFound';

describe('NotFound Component', () => {
  test('should render H2 header with text "Page requested not found"', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const header = getByText(/Page requested not found/i);

    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('H2');
  });

  test('should render specific image', () => {
    renderWithRouter(<NotFound />);
    const image = document.querySelector('.not-found-image');

    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

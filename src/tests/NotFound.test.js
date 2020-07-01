import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Test on the NotFound page', () => {
  test('Heading h2 includes "Page requested not found 😭"', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/bad/route' });
    const h2 = getByText(/Page requested not found/i);

    expect(h2.tagName).toBe('H2');
    expect(h2).toBeInTheDocument();
  });
  test('Must have an image', () => {
    const { container } = renderWithRouter(<NotFound />, { route: '/bad/route' });
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = container.querySelector('img');

    expect(image).toHaveAttribute('src', imageUrl);
  });
});

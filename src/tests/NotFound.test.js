import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Testando NotFound', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { container, getByText } = renderWithRouter(<NotFound />);
    const h2Tag = container.querySelector('h2');
    expect(h2Tag).toBeInTheDocument();
    const text = getByText(/Page requested not found/i);
    expect(text).toBeInTheDocument();
  });
  test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { container } = renderWithRouter(<NotFound />);
    const imgTag = container.querySelector('.not-found-image');
    expect(imgTag).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

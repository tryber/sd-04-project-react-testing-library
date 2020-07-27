import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando NotFound', () => {
  test('Testando a tag h2', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const h2 = getByText(/Page requested not found/i);

    expect(h2.tagName).toBe('H2');
  });

  test('Exibir a imagem', () => {
    const { container } = renderWithRouter(<NotFound />, { route: '/rotaTestNotFound' });
    const img = container.querySelector('IMG');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toBe(img);
    expect(img.src).toBe(url);
  });
});

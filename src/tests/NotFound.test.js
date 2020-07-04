import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  afterEach(cleanup);

  test('Contém um H2 com o Texto "Page requested not found"', () => {
    const { getByText } = render(<NotFound />);
    const message = getByText('Page requested not found');
    expect(message).toBeInTheDocument();
  });

  test('Contém uma imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText(/Pikachu crying/);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});

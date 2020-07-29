import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('Finding h2 heading', () => {
    const { getByText } = render(<NotFound />);
    const error = getByText(/Page requested not found/i);
    expect(error).toBeInTheDocument();
  });

test('Verificar imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    );
});
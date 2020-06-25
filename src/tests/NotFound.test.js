import React from 'react';
import { cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('teste da Not Found', () => {
  test('Testar título About Pokédex', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(/Page requested not found/i);
  });

  test('Testar Imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Testando pagina NotFound', () => {
  test('Testando h2 (Page requested not found)', () => {});
  const { getByText } = renderWithRouter(<NotFound />);
  const textAbout = getByText(/Page requested not found/i);
  expect(textAbout).toBeInTheDocument();

  test('Testando imagem', () => {});
  const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const { container } = renderWithRouter(<NotFound />);
  expect(container.querySelector('img').src).toBe(img);
});

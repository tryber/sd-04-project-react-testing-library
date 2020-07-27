import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes do arquivo NotFound.js', () => {
  afterEach(cleanup);
  it('A página deve conter um heading h2 com o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heanding = getByText(/Page requested not found/i);
    expect(heanding).toBeInTheDocument();
  });

  it('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(image.getAttribute('src')).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});

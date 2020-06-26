import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('quarto requesito', () => {
  it('a página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = render(<NotFound />);
    const title = getByText(/Page requested not found/i);
    expect(title.tagName).toBe('H2');
  });
  it('a página deve conter a imagem apropriada de uma Pokédex', () => {
    const { getAllByRole } = render(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1]).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});

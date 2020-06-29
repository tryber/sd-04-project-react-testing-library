import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Not Found', () => {
  test('A página deve conter um heading `h2` com o texto `Page requested not found 😭`.', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    expect(heading.textContent).toBe('Page requested not found 😭 ');
  });

  test('A página deve exibir a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`.', () => {
    const { getAllByRole } = render(<NotFound />);
    const img = getAllByRole('img');
    expect(img[1]).toBeInTheDocument();
    expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

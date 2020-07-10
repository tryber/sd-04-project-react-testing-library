import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('teste do arq NotFound', () => {
  afterEach(cleanup);
  test('A página deve conter um heading `h2` com o texto `Page requested not found 😭` ', () => {
    const { getByText } = render(<NotFound />);
    const pgNotFound = getByText(/Page requested not found/);
    expect(pgNotFound.tagName).toBe('H2');
    expect(pgNotFound).toBeInTheDocument();
  });

  test('should ', () => {
    const { getByAltText } = render(<NotFound />);
    const a = getByAltText(/Pikachu crying because the page requested was not found/);
    expect(a.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

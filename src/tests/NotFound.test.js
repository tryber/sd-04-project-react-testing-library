import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do arquivo NotFound.js', () => {
  afterEach(cleanup);

  test('Testar h2 com o texto "Page requested not found"', () => {
    const { getByText } = render(<NotFound />);
    const el = getByText(/Page requested not found/);
    expect(el.tagName).toBe('H2');
  });

  test('Exibir imagem', () => {
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { getByAltText } = render(<NotFound />);
    const el = getByAltText(/^Pikachu crying/);
    expect(el.src).toBe(url);
  })
})

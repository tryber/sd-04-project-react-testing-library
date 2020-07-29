import React from 'react';
import renderWithRouter from '../Helper/renderWithRouter';
import { NotFound } from '../components';

describe('Testes do arquivo NotFound', () => {
    test('A página deve conter um heading h2 com o texto Page requested not found', () => {
        const { getByText } = renderWithRouter(<NotFound />);
        expect(getByText(/Page requested not found/i)).toBeInTheDocument();
    });

    test('A página deve exibir a imagem', () => {
        const { container } = renderWithRouter(<NotFound />);
        const tag = container.querySelector('img');
        const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
        expect(tag.src).toBe(imageUrl);
    });
});

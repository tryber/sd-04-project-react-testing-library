import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do NotFound', () => {
	test('Existe um <h2> com texto indicando rota nao encontrada"?', () => {
		const { getByText } = render(<NotFound />);
		const notFound = getByText('Page requested not found');
		expect(notFound).toBeInTheDocument();
	});

	test('Existe uma imagem na page Not Found?', () => {
		const { container } = render(<NotFound />);
		const imgSrc = container.querySelector('img');
		expect(imgSrc.src).toBe(
			'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
		);
	});
});

import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

test('Teste do texto contido em h2', () => {
  const { getByText, container, getAllByRole } = renderWithRouter(<NotFound />);
  const textcontainer = container.getElementsByTagName('h2');
  const text = getByText('Page requested not found');
  const face = getAllByRole('img');

  console.log(textcontainer);
  expect(text).toBeInTheDocument();
  expect(face.length).toBe(2);
  expect(textcontainer).toBeInTheDocument();
});

test('teste da imagem', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(getAllByRole('img')[1].src).toBe(src);
});

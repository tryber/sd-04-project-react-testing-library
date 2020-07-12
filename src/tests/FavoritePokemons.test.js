import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';

test(`Caso a pessoa não tenha pokémons favoritos,
a mensagem 'No favorite pokemon found' deve aparecer na tela.`, () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/favorites']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

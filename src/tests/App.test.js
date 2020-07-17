import React from 'react';
import { /* Router, */ MemoryRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { render, /* fireEvent */ } from '@testing-library/react';

// import renderWithRouter from '../RenderWithRouter';
import App from '../App';


test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

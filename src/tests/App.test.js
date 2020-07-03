import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('testing if shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('testing if shows the About when the route is `/about`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('About')).toBeInTheDocument();
});

test('testing if shows the Favorites the `/favorites`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/favorites']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('testing if `Home` got to the `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const home = getByText('Home');
  fireEvent.click(home, { target: { to: '/favorites' } });
});

/* Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada
para a página inicial, na URL "/"
Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada
para a página de About, na URL "/about"
Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada
para a página de pokémons favoritados, na URL "/favorites"
Entrar em uma URL desconhecida exibe a página Not Found */

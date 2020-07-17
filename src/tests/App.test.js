import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
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

test('O primeiro link deve possuir o texto `Home` com a URL `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(home).toBeInTheDocument();
  });


/*


- No topo da aplicação, deve haver um conjunto fixo de links de navegação


  - O segundo link deve possuir o texto `About` com a URL `/about`;

  - O terceiro link deve possuir o texto `Favorite Pokémons` com a URL `/favorites`.

- Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"

- Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de `About`, na URL "/about"

- Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"

- Entrar em uma URL desconhecida exibe a página `Not Found`
*/
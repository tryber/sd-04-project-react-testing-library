import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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

test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('O primeiro link deve possuir o texto `Home` com a URL `/` e redirecionar para /', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Home/i));

  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
});

test('O segundo link deve possuir o texto `About` com a URL `/about` e redirecionar para /about', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/about/i));

  const about = getByText(/About Pokédex/i);
  expect(about).toBeInTheDocument();
});

test('O terceiro link deve possuir o texto `Favorite Pokémons` com a URL `/favorites` e redirecionar para /favorites', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Favorite Pokémons/i));

  const favorite = getByText(/no favorite pokemon found/i);
  expect(favorite).toBeInTheDocument();
});

test('Entrar em uma URL desconhecida exibe a página `Not Found`', () => {
  const history = createMemoryHistory();
  const route = '/url-aleatoria-inexistente';
  history.push(route);
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});

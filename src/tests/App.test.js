import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test(`Ao carregar a aplicação no caminho de URL “/”, a página 
principal da Pokédex deve ser mostrada.`, () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const initialPage = getByText(/Encountered pokémons/i);
  expect(initialPage).toBeInTheDocument();
});

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home com a URL /', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const HomeLink = getByText(/Home/);
    expect(HomeLink.href).toMatch(/\/$/);
  });
  test('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const AboutLink = getByText(/About/);
    expect(AboutLink.href).toMatch(/\/about$/);
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const favLink = getByText(/Favorite Pokémons/);
    expect(favLink.href).toMatch(/\/favorites$/);
  });
});

test(`Ao clicar no link "Home" na barra de navegação, 
a aplicação deve ser redirecionada para a página inicial, na URL "/"`, () => {
  const { getByText, history: { location: { pathname } } } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/));
  expect(pathname).toBe('/');
});

test(`Ao clicar no link "About" na barra de navegação,
a aplicação deve ser redirecionada para a página de About, na URL "/about"`, () => {
  const { getByText, history: { location: { pathname } } } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/));
  expect(pathname).toBe('/about');
});

test(`Ao clicar no link "Favorite Pokémons" na barra de navegação, 
a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"`, () => {
  const { getByText, history: { location: { pathname } } } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/));
  expect(pathname).toBe('/favorites');
});

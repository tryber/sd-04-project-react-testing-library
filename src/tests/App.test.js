import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
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

describe('Testando links', () => {
  test('O primeiro link deve possuir o texto Home com a URL /', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('About')).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Testando routes', () => {
  test('Navigating to `Home`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });

  test('Navigating to `About`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });

  test('Navigating to `Favorite Pokémons`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Navigating to a page that does not exist', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/any-route' });

    expect(getByText(/not found/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Iniciando testes com o arquivo App.js', () => {
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

  test('Navegando no Link Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homePage = getByText(/Home/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(homePage);
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('Navegando no Link About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const AboutPage = getByText(/About/i);
    expect(AboutPage).toBeInTheDocument();

    fireEvent.click(AboutPage);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('Navegando no Link Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const FavoritePage = getByText(/Favorite Pokémons/i);
    expect(FavoritePage).toBeInTheDocument();

    fireEvent.click(FavoritePage);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});

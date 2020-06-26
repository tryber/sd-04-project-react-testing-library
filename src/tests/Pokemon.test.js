import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import data from '../data';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history =
    routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Testes do requisito 6, Pokemon.js', () => {
  test('Testando o card', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toBeInTheDocument();
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
  });

  test('Testando o nome', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokeName = getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe(data[0].name);
    // const btn = getByText('Próximo pokémon');
    // data.forEach(({ name }) => {
    //   expect(getByTestId('pokemon-name').textContent).toBe(name);
    //   fireEvent.click(btn);
    // });
  });

  test('Testando o peso', () => {
    const { getByText } = renderWithRouter(<App />);

    const btn = getByText('Próximo pokémon');
    data.forEach(({ averageWeight: { value, measurementUnit } }) => {
      expect(
        getByText(`Average weight:${value}${measurementUnit}`),
      ).toBeInTheDocument();
      fireEvent.click(btn);
    });
  });

  test('Testando a src e alt', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    const btn = getByText('Próximo pokémon');
    const image = getByAltText(/Pikachu sprite/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    fireEvent.click(btn);
  });

  test('Testando o link de navegação', () => {
    const { getByText } = renderWithRouter(<App />);

    const btn = getByText('Próximo pokémon');
    const btnDetails = getByText('More details');
    data.forEach(({ id }) => {
      expect(btnDetails.href).toBe(`http://localhost/pokemons/${id}`);
      fireEvent.click(btn);
    });
  });

  test('Testar ao clicar no link se muda a rota', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByText('More details');
    expect(detailsLink.href).toMatch(`/pokemons/${data[0].id}`);
    fireEvent.click(detailsLink);
    const path = history.location.pathname;
    expect(path).toBe(`/pokemons/${data[0].id}`);
  });

  test('icone de estrela', () => {
    const { getByText, getByLabelText, getAllByRole } = renderWithRouter(
      <App />,
    );

    const detailsLink = getByText('More details');
    fireEvent.click(detailsLink);

    const favLabel = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favLabel);

    const imgs = getAllByRole('img');
    const starIcon = imgs.filter((img) => img.src.includes('/star-icon.svg'));

    expect(starIcon[0].alt).toBe(`${data[0].name} is marked as favorite`);
    expect(starIcon.length).toBeGreaterThan(0);
  });
});

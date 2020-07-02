import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../components/renderWithRouter';

describe('testando pokemons details', () => {
  test('testando h2', () => {
    // const rout = `/pokemons/${pokemons[0].id}
    const { getByText, history } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    history.push(`/pokemons/${pokemons[0].id}`);
    const heading = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(heading).toBeInTheDocument();
  });
  test('testando img', () => {
    const { getAllByAltText, history } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    history.push(`/pokemons/${pokemons[0].id}`);
    const img = getAllByAltText(`${pokemons[0].name} location`);
    expect(img[0]).toBeInTheDocument();
    expect(img[0]).toHaveAttribute('src', `${pokemons[0].foundAt[0].map}`);
  });
  test('testando sumario', () => {
    const { getByText, history } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    history.push(`/pokemons/${pokemons[0].id}`);
    const sumario = getByText(/Summary/i);
    expect(sumario).toBeInTheDocument();
    const sumarioContent = getByText(`${pokemons[0].summary}`);
    expect(sumarioContent).toBeInTheDocument();
  });
  test('testando favorito', () => {
    const { getByText, history } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    history.push(`/pokemons/${pokemons[0].id}`);
    const favorite = getByText(/Pokémon favoritado/i);
    expect(favorite).toBeInTheDocument();
  });
  test('testando detales', () => {
    const { getByText, history } = renderWithRouter(<App />, { route: `/pokemons/${pokemons[0].id}` });
    history.push(`/pokemons/${pokemons[0].id}`);
    const detales = getByText(`${pokemons[0].name} Details`);
    expect(detales).toBeInTheDocument();
  });
});

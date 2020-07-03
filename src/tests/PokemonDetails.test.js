import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

afterEach(cleanup);

describe('Testando PokemonDetails', () => {
  test('Deve conter mais informações sobre apenas o pokémon selecionado;', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  });
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const text = getByText(`${pokemons[0].name} Details`);
    expect(text).toBeInTheDocument();
  });
  test('O pokémon exibido não deve conter um link para exibir detalhes deste pokémon', () => {
    const { queryByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const textDetails = queryByText('More details');
    expect(textDetails).not.toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um heading h2 com o texto Summary;', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const textSummary = getByText('Summary');
    expect(textSummary).toBeInTheDocument();
    expect(textSummary.tagName).toBe('H2');
  });
  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado;', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const textPokemonSummary = getByText(`${pokemons[0].summary}`);
    expect(textPokemonSummary).toBeInTheDocument();
  });
});

describe('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
  test('A seção de detalhes deve conter um heading h2 com o texto Game Locations', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const textGameLocation = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(textGameLocation).toBeInTheDocument();
    expect(textGameLocation.tagName).toBe('H2');
  });
  test('A seção de detalhes deve exibir todas as localizações do pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    pokemons[0].foundAt.map(({ location }) => expect(getByText(location)).toBeInTheDocument());
  });
  test('Cada localização deve exibir o nome da localização e uma imagem do mapa da localização', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const arrayImage = getAllByRole('img');
    pokemons[0].foundAt.map(({ location, map }) => {
      expect(getByText(location)).toBeInTheDocument();
      return expect(arrayImage.some(({ src }) => src === map)).toBeTruthy();
    });
    expect(arrayImage.some(({ alt }) => alt === `${pokemons[0].name} location`)).toBeTruthy();
  });
  test('A página de detalhes deve permitir favoritar um pokémon', () => {
    const { getByText, container, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const textFavorite = getByText(/Pokémon favoritado/i);
    expect(textFavorite).toBeInTheDocument();
    fireEvent.click(textFavorite);
    const imgStar = container.querySelector('.favorite-icon');
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    fireEvent.click(textFavorite);
    expect(imgStar).not.toBeInTheDocument();
  });
});

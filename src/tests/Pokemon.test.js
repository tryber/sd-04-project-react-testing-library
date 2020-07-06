import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderwithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Pokemon card', () => {
  test('should render a pokemon card', () => {
    renderWithRouter(<App />, { route: '/' });
    const pokemonCard = document.querySelector('.pokemon');

    expect(pokemonCard).toBeInTheDocument();
  });

  test('should render pokemon correct name on card', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/' });
    const pokemonName = getByTestId('pokemon-name');

    expect(pokemonName.textContent).toBe(pokemons[0].name);
  });

  test('should render pokemon information about weight', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/' });
    const pokemonWeight = getByTestId('pokemon-weight');
    const {
      averageWeight: { value, measurementUnit },
    } = pokemons[0];

    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.textContent).toBe(`Average weight:${value}${measurementUnit}`);
  });

  test('should render correct pokemon sprite', () => {
    const { container } = renderWithRouter(<App />, { route: '/' });
    const { name, image } = pokemons[0];
    const pokemonSprite = container.querySelector('.pokemon').querySelector('img');

    expect(pokemonSprite).toBeInTheDocument();
    expect(pokemonSprite.getAttribute('src')).toBe(image);
    expect(pokemonSprite.getAttribute('alt')).toBe(`${name} sprite`);
  });

  test('should have link to pokemon details', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const { id } = pokemons[0];
    const link = getByText(/More details/i);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('should redirect to details page on click', () => {
    const { getByText, history } = renderWithRouter(<App />, { route: '/' });

    const moreInfo = getByText('More details');
    const { id } = pokemons[0];

    fireEvent.click(moreInfo);
    expect(history.location.pathname).toMatch(`pokemons/${id}`);
  });
});

describe('Favorite pokemon', () => {
  test('Favorite Pokémon should display a star icon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={pokemons[0]} isFavorite />);
    const fevoriteIcon = getByAltText(`${pokemons[0].name} is marked as favorite`);

    expect(fevoriteIcon).toBeInTheDocument();
    expect(fevoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});

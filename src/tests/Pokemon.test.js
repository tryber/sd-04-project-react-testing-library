import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('6. Tests of the Pokemon.js file', () => {
  test('A card with the information of a certain Pokémon must be returned with the correct name', () => {
    renderWithRouter(<App />);

    const pokemonsName = screen.getByTestId('pokemon-name');
    expect(pokemonsName).toBeInTheDocument();
    expect(pokemonsName).toHaveTextContent('Pikachu');
  });

  test('The average weight of the Pokémon must be displayed with text in the format Average weight.', () => {
    renderWithRouter(<App />);

    const pokemonsWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonsWeight).toBeInTheDocument();
    expect(pokemonsWeight).toHaveTextContent('Average weight:6.0kg');
  });

  test('The image must contain a src attribute with the URL of the pokémon image. The image must also have an alt attribute with the text <name> sprite.', () => {
    renderWithRouter(<App />);

    const pokemonsImg = screen.getByRole('img');
    expect(pokemonsImg.alt).toBe(`${data[0].name} sprite`);
    expect(pokemonsImg.src).toBe(`${data[0].image}`);
  });

  test('The Pokémon displayed on the Pokédex must contain a navigation link to view details of this Pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonsLink = screen.getByText('More details');
    expect(pokemonsLink).toBeInTheDocument();
    expect(pokemonsLink).toHaveAttribute('href', `/pokemons/${data[0].id}`);
  });

  test('Favorite Pokémon should display a star icon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText('More details');
    fireEvent.click(detailsLink);

    const pokFavorite = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(pokFavorite);

    const imgPokFavorite = screen.getAllByRole('img');
    expect(imgPokFavorite[1]).toBeInTheDocument();
    expect(imgPokFavorite[1].src).toBe('http://localhost/star-icon.svg');
    expect(imgPokFavorite[1].alt).toBe(`${data[0].name} is marked as favorite`);
  });
});

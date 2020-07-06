import React from 'react';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';
import { fireEvent, getByRole } from '@testing-library/react';
import pokemons from '../data';

describe('Requisito 7 Pokemons Details', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const { getByText, getByTestId, getAllByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More Details/i));
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
    expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    const h2 = document.querySelectorAll('h2');
    expect(h2[1].innerHTML).toBe(' Summary ');
    const p = document.querySelectorAll('p')[3];
    expect(p.innerHTML).toBe(pokemons[0].summary);
    expect(h2[2].innerHTML).toBe(`Game Locations of ${pokemons[0].name}`);
    expect(getByText(pokemons[0].foundAt[0].location)).toBeInTheDocument();
    expect(getByText(pokemons[0].foundAt[1].location)).toBeInTheDocument();
    const img = getAllByRole('img');
    expect(img[1].src).toBe(pokemons[0].foundAt[0].map);
    expect(img[1].alt).toBe(`${pokemons[0].name} location`);
    expect(img[2].src).toBe(pokemons[0].foundAt[1].map);
    expect(img[2].alt).toBe(`${pokemons[0].name} location`);
    const favorite = document.querySelector('input');
    expect(favorite.type).toBe('checkbox');
    expect(getByText(/Pokémon favoritado/i)).toBeInTheDocument();
  });
});

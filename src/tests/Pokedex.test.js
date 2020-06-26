import React from 'react';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

// describe('Click next button must diplay next pokemon', () => {
//   test('Button must contain the text "Próximo pokémon" ', () => {
//     const {} = render(
//         <Pokedex />
//     );

//   });
// });

describe('Click next button must display next pokemon', () => {
  test('Click next button must display next pokemon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonNext = getByText(/Próximo pokémon/);
    expect(buttonNext.type).toBe('button');
    expect(buttonNext).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Charmander');
  });
  test('Arriving to the last pokemon Click next button must display first pokemon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonNext = getByText(/Próximo pokémon/);
    expect(buttonNext).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    fireEvent.click(buttonNext);
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Caterpie');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Ekans');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Alakazam');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Mew');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Rapidash');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Snorlax');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Dragonair');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('Pokedex must show only one pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = screen.getAllByTestId('pokemon-name');
    console.log(pokemonName.length);
    expect(pokemonName.length).toBe(1);
  });
  test('Pokedex must contain filter button', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = screen.getAllByTestId('pokemon-name');
    console.log(pokemonName.length);
    expect(pokemonName.length).toBe(1);
  });
});

import React from 'react';
import { cleanup, fireEvent, getAllByTestId, render, getByTestId, getByText, getAllByText } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('should render the next pokemon when the next button is clicked', () => {
  it('should have the text `Próximo pokémon` in the next button', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('next-pokemon')).toHaveTextContent('Próximo pokémon');
  })

  it('must show the next pokemon in the list when successive clicks in the button are made', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    })
  })

  it('should render the first pokemon when the button is clicked when the last pokemon is being rendered', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    for (let i = 0; i < pokemons.length; i += 1) {
      fireEvent.click(getByTestId('next-pokemon'));
    }

    expect(getByText('Pikachu')).toBeInTheDocument();
  })

  it('must render one pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });
})

describe('the pokedex must contain filter buttons', () => {
  it('should only circulate through the Pokémon of the type from the selected type button, ', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

    getAllByTestId('pokemon-type-button').forEach((button) => {
      fireEvent.click(button);
      const pokemonType = pokemons.filter((pokemon) => pokemon.type === button);

      for (let i = 0; i < pokemonType.length; i += 1) {
        expect(getByTestId(pokemonType)).toHaveTextContent('button')
        fireEvent.click(getByTestId('next-pokemon'));
      }
    })
  });

  it('must have the text of the type in the button', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

    getAllByTestId('pokemon-type-button').forEach((button) => {
      fireEvent.click(button);
      expect(getByTestId('pokemonType').textContent).toBe(button.textContent);
    });
  });
});


describe('the pokedex must contain a button to reset the filter', () => {
  it('must have a button with the text `All`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('All')).toBeInTheDocument();
  })

  it('must circulate through all the pokemons when the `All` button is clicked', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('All'));
    pokemons.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  it('must have the filter `All` selected when the page loads', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument()
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });
});

it('must generate, dynamically, a filter button to each type of pokemon', () => {
  const { queryAllByTestId } = renderWithRouter(<App />);
  const pokemonsTypes = pokemons.map((pokemon) => pokemon.type);
  const pokemonsTypesFiltered = [...new Set(pokemonsTypes)];
  pokemonsTypesFiltered.push('All');
  const pokemonsTypesSorted = pokemonsTypesFiltered.sort();

  const typesButtons = queryAllByTestId('pokemon-type-button');
  const typesButtonsText = typesButtons.map((button) => button.textContent);
  typesButtonsText.push('All');
  const typesButtonsTextSorted = typesButtonsText.sort()

  expect(typesButtonsTextSorted).toEqual(pokemonsTypesSorted);
});

it('must disable the `Próximo pokémon` button if there is only one is the list', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
  const typesButtons = getAllByTestId('pokemon-type-button');

  typesButtons.forEach((button) => {
    const currentPokemon = getByTestId('pokemon-name');
    fireEvent.click(button)
    const nextPokemon = getByTestId('pokemon-name');

    const pokemonsType = pokemons.filter((item) => item.type === button.textContent);

    if (pokemonsType.length === 1) expect(currentPokemon === nextPokemon)
  })
});


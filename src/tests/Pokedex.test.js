//test('', () => {});
import React from 'react';
import { cleanup, fireEvent, getAllByAltText } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Requirement 5 - Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText('Próximo pokémon');
    expect(button.tagName).toBe('BUTTON');

    fireEvent.click(getByText(/Próximo Pokémon/i));
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo Pokémon/i));
    const caterpie = getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo Pokémon/i));
    const ekans = getByText(/Ekans/i);
    expect(ekans).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo Pokémon/i));
    const alakazam = getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo Pokémon/i));
    const mew = getByText(/Mew/i);
    expect(mew).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo Pokémon/i));
    const rapidash = getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo Pokémon/i));
    const snorlax = getByText(/Snorlax/i);
    expect(snorlax).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo Pokémon/i));
    const dragonair = getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo Pokémon/i));
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  it('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemon = getByTestId('pokemon-name');
    expect(pokemon.attributes.length).toBe(1);
  });
  it('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const typeButton = getAllByTestId('pokemon-type-button');
    const pokemonType = getByTestId('pokemonType');
    typeButton.forEach((item) => {
      fireEvent.click(item);
      expect(pokemonType.innerHTML).toBe(item.innerHTML);
    });
  });
  it('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const all = getByText('All');
    expect(all).toBeInTheDocument();
    const firstPokemon = getByText('Pikachu');
    fireEvent.click(all);
    expect(firstPokemon).toBeInTheDocument();
  });
  it('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const typeButton = getAllByTestId('pokemon-type-button');
    expect(typeButton).toBeDefined();
    const all = getByText('All');
    expect(all).toBeDefined();
  });
  it('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const pokemon = getByTestId('pokemon-name');
    const nextButton = getByText('Próximo pokémon');
    if (pokemon.attributes.length !== 1) {
      expect(nextButton.disabled).toBe(true);
    }
  });
});

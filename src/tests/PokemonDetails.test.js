import React from 'react';
import { fireEvent, logDOM, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

describe('PokemonDetails', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/More details/i);
    fireEvent.click(heading);
    const nome = getByText(`${pokemons[0].name} Details`);
    expect(nome).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading `h2` com o texto `Summary`;', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/More details/i);
    fireEvent.click(heading);
    const h2 = getByText('Summary');
    expect(h2).toBeInTheDocument();
  });

  test(' A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado;', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/More details/i);
    fireEvent.click(heading);
    const sections = getAllByRole('region');
    expect(sections[1].children[1]).toBeInTheDocument();
    expect(sections[1].children[1].textContent).toBe(pokemons[0].summary);
    logDOM();
  });
});

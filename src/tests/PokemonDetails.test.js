import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
  });

  test('A seção de detalhes deve conter um heading `h2` com o texto `Game Locations of <name>`, , onde `<name>` é o nome do pokémon exibido;', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/More details/i);
    fireEvent.click(heading);
    const sections = getAllByRole('region');
    expect(sections[2].children[0]).toBeInTheDocument();
    expect(sections[2].children[0].textContent).toBe(`Game Locations of ${pokemons[0].name}`);
  });

  test('A imagem da localização deve ter um atributo `src` com a URL da localização;', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/More details/i);
    fireEvent.click(heading);
    const imgs = getAllByRole('img');
    console.log(imgs[imgs.length - 2].alt);
    expect(imgs[imgs.length - 2].src).toBe(pokemons[0].foundAt[0].map);
    expect(imgs[imgs.length - 2].alt).toBe(`${pokemons[0].name} location`);
  });

  test(' O label do checkbox deve ser `Pokémon favoritado?`', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/More details/i);
    fireEvent.click(heading);
    const input = getByLabelText('Pokémon favoritado?');
    expect(input).toBeInTheDocument();
  });
});

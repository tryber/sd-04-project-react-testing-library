import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('Testes do arquivo PokemonDetails', () => {

  test('Conter informações apenas do nome do pokemon  selecionado', () => {
    const { getByText } = renderWithRouter(<App />);
    const text = getByText(/More details/i);
    fireEvent.click(text);
    const name = getByText(`${pokemons[0].name} Details`);
    expect(name).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = renderWithRouter(<App />);
    const text = getByText(/More details/i);
    fireEvent.click(text);
    const headingH2 = getByText('Summary');
    expect(headingH2).toBeInTheDocument();
  });

  test(' A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const text = getByText(/More details/i);
    fireEvent.click(text);
    const sections = getAllByRole('region');
    expect(sections[1].children[1]).toBeInTheDocument();
    expect(sections[1].children[1].textContent).toBe(pokemons[0].summary);
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, , onde <name> é o nome do pokémon exibido;', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const text = getByText(/More details/i);
    fireEvent.click(text);
    const sections = getAllByRole('region');
    expect(sections[2].children[0]).toBeInTheDocument();
    expect(sections[2].children[0].textContent).toBe(`Game Locations of ${pokemons[0].name}`);
  });

  test('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const text = getByText(/More details/i);
    fireEvent.click(text);
    const imgs = getAllByRole('img');
    expect(imgs[imgs.length - 2].src).toBe(pokemons[0].foundAt[0].map);
    expect(imgs[imgs.length - 2].alt).toBe(`${pokemons[0].name} location`);
  });

  test(' A página deve conter um checkbox que permita favoritar um pokémon', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const text = getByText(/More details/i);
    fireEvent.click(text);
    const input = getByLabelText('Pokémon favoritado?');
    expect(input).toBeInTheDocument();
  });
});

import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('Requirement 7', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const pokename = getByText(`${data[0].name} Details`).innerHTML;
    expect(pokename).toBe('Pikachu Details');
  });
  it('O pokémon exibido na página de detalhes não deve conter um link de navegação...', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const details = queryByText('More details');
    expect(details).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary;', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const summary = getByText('Summary').tagName;
    expect(summary).toBe('H2');
  });
  it('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado;', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const summary = getByText(data[0].summary);
    expect(summary).toBeInTheDocument();
  });
  it('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const pokeDetails = getByText(`${data[0].name} Details`);
    expect(pokeDetails).toBeInTheDocument();
    const gameLoc = getByText(`Game Locations of ${data[0].name}`).tagName;
    expect(gameLoc).toBe('H2');
    const locations = data[0].foundAt.length;
    expect(locations).toBeGreaterThan(0);
    const locationsDetails = data[0].foundAt[0];
    expect(locationsDetails.location).toBe('Kanto Viridian Forest');
    expect(locationsDetails.map).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const imgAlt = document.querySelectorAll('img');
    expect(imgAlt[1].alt).toBe(`${data[0].name} location`);
  });
  it('A página de detalhes deve permitir favoritar um pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const favorite = getByText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
  });
});

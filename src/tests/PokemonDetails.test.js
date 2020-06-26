import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando o requisito 7 por inteiro', () => {
  test('testing wether page shows npokemon name', () => {
    const {
      getByText,
      getAllByAltText,
      getByAltText,
      queryByText,
    } = renderWithRouter(<App />);

    // A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;
    const btn = getByText('More details');

    fireEvent.click(btn);

    const pokeName = getByText('Pikachu Details');
    expect(pokeName).toBeInTheDocument();

    // O pokémon exibido na página de detalhes não deve conter um link de navegação;
    const detailLink = queryByText(/more details/i);
    expect(detailLink).toBeNull();

    // A seção de detalhes deve conter um heading h2 com o texto Summary;
    const heading = getByText('Summary');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');

    // A seção de detalhes deve conter um parágrafo com o resumo do pokémon sendo visualizado;
    const p = getByText(/this intelligent Pokémon/i);
    expect(p).toBeInTheDocument();
    expect(p.tagName).toBe('P');

    // A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon
    const locations = getByText('Game Locations of Pikachu');
    expect(locations).toBeInTheDocument();
    expect(locations.textContent).toBe('Game Locations of Pikachu');

    const imgs = getAllByAltText('Pikachu location');
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0].src).toBe(
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(imgs[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );

    const sub = getByText('Kanto Viridian Forest');
    expect(sub).toBeInTheDocument();
    const sub2 = getByText('Kanto Power Plant');
    expect(sub2).toBeInTheDocument();

    // A página de detalhes deve permitir favoritar um pokémon
    const fav = getByText('Pokémon favoritado?');
    expect(fav).toBeInTheDocument();
    fireEvent.click(fav, { target: { checked: true } });
    const star = getByAltText(/marked as/);
    expect(star).toBeInTheDocument();
  });
});

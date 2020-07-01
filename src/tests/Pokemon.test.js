import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';


const Caterpie = {
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: {
    value: '2.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 30',
      map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
    },
    {
      location: 'Johto Route 31',
      map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
    },
    {
      location: 'Ilex Forest',
      map: 'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
    },
    {
      location: 'Johto National Park',
      map: 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
    },
  ],
  summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
};

test('A card with the information of a specific Pokémon must be returned', () => {
  const { getByTestId, getByText, getAllByText } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  data.forEach(({ name, type }) => {
    expect(getByText(name)).toBeInTheDocument();
    expect(getAllByText(type)[1]).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
  });
});

test('Average weight', () => {
  const { getByText } = renderWithRouter(<App />);

  const btn = getByText('Próximo pokémon');

  data.forEach(({ averageWeight: { value, measurementUnit } }) => {
    const averageWeight = getByText(
      `Average weight:${value}${measurementUnit}`,
    );
    expect(averageWeight).toBeInTheDocument();
    fireEvent.click(btn);
  });
});

test('image Pokemon', () => {
  const { container, getByAltText, getByText } = renderWithRouter(<App />);
  const img = container.querySelector('img');
  const button = getByText('Próximo pokémon');

  data.forEach(({ name, image }) => {
    const alt = getByAltText(`${name} sprite`);
    expect(alt).toBeInTheDocument();
    expect(img).toHaveAttribute('src', `${image}`);
    fireEvent.click(button);
  });
});

test(' link to view details', () => {
  const { getByText } = renderWithRouter(<App />);
  const btn = getByText(/Próximo pokémon/i);
  const moreDetails = getByText(/More details/i);

  data.forEach(({ id }) => {
    expect(moreDetails.href).toMatch(`pokemons/${id}`);
    fireEvent.click(btn);
  });
});

test('Click in more detail', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const details = getByText('More details');
  const { id } = data[0];

  fireEvent.click(details);
  console.log(expect(history));
  expect(history.location.pathname).toMatch(`pokemons/${id}`);
});

test('Favorite star icon', () => {
  const { getByAltText } = renderWithRouter(<Pokemon pokemon={Caterpie} isFavorite />);
  const img = getByAltText(`${Caterpie.name} is marked as favorite`);

  expect(img).toBeInTheDocument();
  expect(img.src).toMatch(/\/star-icon.svg/);
});

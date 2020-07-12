import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('A página deve conter um heading `h2` com o texto `About Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/about/i));

  const paragrafo1 = getByText(
    /This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i,
  );
  const paragrafo2 = getByText(
    /One can filter Pokémons by type, and see more details for each one of them/i,
  );

  expect(paragrafo1).toBeInTheDocument();
  expect(paragrafo2).toBeInTheDocument();
});

test(`A página deve conter a seguinte imagem de uma Pokédex:
'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'`, () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/about/i));

  const alt = getByAltText(/Pokédex/i);
  expect(alt).toBeInTheDocument();
  expect(alt.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});

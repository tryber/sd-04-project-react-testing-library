import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';


test('Should render the #AboutPage', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/about' });
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('Should render h2 with the #AboutPokedex text', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/about' });
  expect(getByText(/About Pokédex/i)).toBeInTheDocument('h2');
});

test('the page should render 2 paragraphs with text about Pokedex', () => {
  const { section } = renderWithRouter(<App />, { route: '/about' });
  const paragraph = section.getElementsByTagName('p');
  expect(paragraph.length).toBe(2);
});

test('The page should contain the following image of a Pokédex', () => {
  const { getByRole } = renderWithRouter(<App />, { route: '/about' });
  const image = getByRole('imgage');
  const html =
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(image.html).toBe(html);
});

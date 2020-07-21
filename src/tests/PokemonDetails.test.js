import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

data.forEach(({ name, id, summary, foundAt }) => {
  test(`Detalhes do pokemon${name}`, () => {
    const {
      getByText, queryByText, getByLabelText, getAllByAltText,
    } = renderWithRouter(
    <App />,
    { route: `/pokemons/${id}` }
    );
   
  });
});
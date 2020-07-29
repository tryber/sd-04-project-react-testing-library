import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
óximo
test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const botao = getByText('Próximo pokémon');
  expect(botao).toBeInTheDocument();
  expect(botao).toHaveTextContent('Próximo pokémon');
  pokemons.forEach((elemento) => {
    const nome = getByTestId('pokemon-name');
    expect(nome).toHaveTextContent(elemento.name);
    fireEvent.click(proximo);
  });
  expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
});

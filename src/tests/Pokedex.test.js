import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import App from '../App';


const getName = (getByText) => {
  data.forEach(({ name }) => {
    const btnProximo = getByText(/Próximo pokémon/i);
    expect(btnProximo).toBeInTheDocument();
    expect(getByText(name)).toBeInTheDocument();
    fireEvent.click(btnProximo);
  });
};

test('When pressing the próximo button, the page should display the next pokémon', () => {
  const { getByText } = renderWithRouter(<App />);
  getName(getByText);
});

test('the Pokédex must return to the first Pokémon at the press...', () => {
  const { getByText } = renderWithRouter(<App />);
  const btnProximo = getByText(/Próximo pokémon/i);
  data.forEach(() => fireEvent.click(btnProximo));
  expect(getByText(data[0].name)).toBeInTheDocument();
});

test('Pokédex must display only one Pokémon at a time', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const details = getAllByText(/More details/i);
  expect(details.length).toBe(1);
});

test('The Pokédex must contain a button to reset the filter', () => {
  const { getByText } = renderWithRouter(<App />);
  const todos = getByText(/All/i);
  expect(todos).toBeInTheDocument();
  fireEvent.click(todos);
  getName(getByText);
  expect(getByText(data[0].name)).toBeInTheDocument();
});

test('Thebutton should be disabled if the filtered ....', () => {
  const { getByText } = renderWithRouter(<App />);
  const Poison = getByText(/Poison/i);
  const btnProximo = getByText(/Próximo pokémon/i);
  fireEvent.click(Poison);
  expect(btnProximo).toBeDisabled();
});

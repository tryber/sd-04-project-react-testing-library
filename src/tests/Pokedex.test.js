import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('testando pokedex', () => {
  test('testando botao', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const botao = queryAllByTestId(/pokemon-type-button/i);
    expect(botao[1]).toBeInTheDocument();
  });
  test('testando botao next', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const next = getByTestId(/next-pokemon/i);
    expect(next.innerHTML).toBe('Próximo pokémon');
  });
  test('testando botao tipo', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const tipo = getAllByTestId(/pokemon-type-button/i);
    expect(typeof tipo[1].innerHTML).toBe('string');
  });
  test('testando cabecalho', () => {
    const { getByText } = renderWithRouter(<App />);
    const cabecalho = getByText(/Encountered pokémons/i);
    expect(cabecalho).toBeInTheDocument();
  });
  test('testando botao all', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const allButton = getByText(/All/i);
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    expect(getByTestId((/next-pokemon/i))).toBeInTheDocument();
  });
});

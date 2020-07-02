import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testing Pokedex Page', () => {
  afterEach(cleanup);
  test('checking the `next` button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/Próximo pokémon/i));
  });
});

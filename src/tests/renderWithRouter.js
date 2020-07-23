import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(component) {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history} >{component}</Router>), history,
  };
};

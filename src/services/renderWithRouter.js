import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithRouter(component, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
}

export default renderWithRouter;

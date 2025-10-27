import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('loads recipe list and filters by search', async () => {
  render(<MemoryRouter initialEntries={['/recipes']}><App /></MemoryRouter>);

  await waitFor(() => expect(screen.queryByText(/Loading recipes/i)).not.toBeInTheDocument());
  expect(screen.getAllByRole('img').length).toBeGreaterThan(0);

  const search = screen.getByLabelText(/Search recipes/i);
  fireEvent.change(search, { target: { value: 'Citrus' }});
  // trigger fetch
  await waitFor(() => expect(screen.getAllByText(/Citrus/i).length).toBeGreaterThan(0));
});

test('navigates to recipe detail', async () => {
  render(<MemoryRouter initialEntries={['/recipes']}><App /></MemoryRouter>);
  await waitFor(() => expect(screen.queryByText(/Loading recipes/i)).not.toBeInTheDocument());

  const firstCardTitle = screen.getAllByRole('img')[0];
  fireEvent.click(firstCardTitle);

  await waitFor(() => expect(screen.getByText(/Ingredients/i)).toBeInTheDocument());
});

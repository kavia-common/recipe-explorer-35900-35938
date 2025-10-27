import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('redirects protected page to signin and allows access after signin (mock)', async () => {
  render(<MemoryRouter initialEntries={['/favorites']}><App /></MemoryRouter>);
  expect(screen.getByLabelText(/Sign In Screen/i)).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/Email/i);
  const pwInput = screen.getByLabelText(/Password/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' }});
  fireEvent.change(pwInput, { target: { value: 'password' }});
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  await waitFor(() => expect(screen.getByText(/Favorites/i)).toBeInTheDocument());
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders Home by default route', () => {
  render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
  expect(screen.getByText(/Discover delicious recipes/i)).toBeInTheDocument();
});

test('renders 404 for bad route', () => {
  render(<MemoryRouter initialEntries={['/random-unknown']}><App /></MemoryRouter>);
  expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders header brand', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const brand = screen.getByText(/Recipe Explorer/i);
  expect(brand).toBeInTheDocument();
});

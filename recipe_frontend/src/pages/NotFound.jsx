import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NotFound page for unmatched routes.
 */
export default function NotFound() {
  return (
    <section className="card" style={{ padding: 16 }}>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for could not be found.</p>
      <Link to="/" className="btn">Go home</Link>
    </section>
  );
}

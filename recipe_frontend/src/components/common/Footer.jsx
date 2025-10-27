import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer displays application footer.
 */
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      © {new Date().getFullYear()} Recipe Explorer • Built with Ocean Professional theme
    </footer>
  );
}

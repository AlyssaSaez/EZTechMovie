import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} EZTechMovie. All rights reserved.</p>
      <p className="footer-small">
        Built with ❤️ by Alyssa, Jayme, and Weston
      </p>
    </footer>
  );
}

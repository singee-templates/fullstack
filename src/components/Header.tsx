import { Link } from '@tanstack/react-router';

import { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.menuButton}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className={styles.logo}>
          <Link to="/">
            <img
              src="/tanstack-word-logo-white.svg"
              alt="TanStack Logo"
              className={styles.logoImage}
            />
          </Link>
        </h1>
      </header>

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className={styles.closeButton}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className={styles.nav}>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={styles.navLink}
            activeProps={{
              className: styles.navLinkActive,
            }}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}

// src/components/Footer.tsx

import styles from './Footer.module.css';

type FooterProps = {
  children?: React.ReactNode;
};

export default function Footer({ children }: FooterProps) {
  return (
    <footer className={styles.footer}>
      {children}
      <h3>&copy; {new Date().getFullYear()} Holidaze</h3>
    </footer>
  );
}

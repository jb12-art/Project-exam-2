// src/components/MainContent.tsx

import type { ReactNode } from 'react'; // ReactNode for TypeScript
import styles from './MainContent.module.css';

interface Props {
  children: ReactNode; // This tells TS that MainContent can wrap other elements
}

export default function MainContent({ children }: Props) {
  return (
    <main className={styles.mainContainer}>
      {children} {/* where the elements appear */}
    </main>
  );
}

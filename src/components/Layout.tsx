// src/components/Layout.tsx
import type { ReactNode } from 'react';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>
        {children} {/* This is where your page-specific content goes */}
      </main>
    </>
  );
}

// src/components/Layout.tsx

import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <MainContent>
        {children} {/* This is where your page-specific content goes */}
      </MainContent>
      <Footer />
    </>
  );
}

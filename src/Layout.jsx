import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
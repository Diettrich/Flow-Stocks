import React from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Container from '@/components/Container';

export const metadata = {
  title: 'Flow Stocks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar
          links={[
            {
              label: 'Acceuille',
              href: '/',
            },
            {
              label: 'Erwan Trading Strategy',
              href: '/erwan-strategy',
            },
          ]}
        />
        <Container className="border-slate-400 border-l-[0.5px] border-r-[0.5px] h-[calc(100vh-56.5px)]">
          {children}
        </Container>
      </body>
    </html>
  );
}

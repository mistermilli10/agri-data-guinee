import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SkipToContent } from '@/components/layout/skip-to-content';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'AgriData Guinée',
  description:
    'Connecter la Terre, les Acteurs et la Technologie pour transformer l’agriculture guinéenne.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.className}>
      <body className="bg-white text-gray-text">
        <SkipToContent />
        <ReactQueryProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

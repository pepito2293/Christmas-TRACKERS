import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Noel Tracker',
  description: 'Organisez vos cadeaux et budgets de Noël',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-neutral-50 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

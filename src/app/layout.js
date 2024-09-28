import { ClerkProvider } from '@clerk/nextjs';
import Header from '../components/Header';
import './globals.css';

export const metadata = {
  title: 'Quiz App',
  description: 'Create and solve quizzes',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
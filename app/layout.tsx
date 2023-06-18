// fonts
import {Inter} from 'next/font/google';
// context
import ToasterContext from './context/ToasterContext';
import {AuthContext} from './context/AuthContext';
// components
import ActiveStatus from './components/ActiveStatus';
// styles
import './globals.css';

export const metadata = {
  title: 'Space message',
  description: 'Space',
};

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}

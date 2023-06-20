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
  title: 'Space Message',
  description: 'Space',
};

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <link rel="icon" href="https://img.icons8.com/?size=512&id=KWTb3yq1VlXC&format=png" type="image/png" />
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

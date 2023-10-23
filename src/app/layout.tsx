import { ReduxProvider } from '@/redux/Provider';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/components/providers/query-provider';

import AuthProvider from '../../context/AuthProvider';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const metadata: Metadata = {
  title: 'A&Z',
  description: 'A&Z Language Center',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ReduxProvider>
            <QueryProvider>
              <Toaster />
              {children}
            </QueryProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
};
export { metadata };
export default RootLayout;

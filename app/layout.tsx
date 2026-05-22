import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-heading' 
});

const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Avadoo Cleaning Services | Professional Facilities Management Abuja',
  description: 'Premium cleaning, fumigation, and facilities management solutions for homes, offices, and estates in Abuja.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
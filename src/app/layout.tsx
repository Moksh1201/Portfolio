import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moksh Madaan | Software Engineer',
  description: 'Portfolio website of Moksh Madaan, a Software Engineer specializing in Full Stack Development, Cloud Computing, and IoT.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'Cloud Computing', 'IoT', 'React', 'Node.js', 'AWS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
} 
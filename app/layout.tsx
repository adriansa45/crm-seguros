import './globals.css';
import * as React from "react";
import Content from '@/components/layout';
import { Analytics } from '@vercel/analytics/react';
import Providers from '@/components/layout/provider';

export const metadata = {
  title: 'CRM pensiones',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <Providers>
          <Content>{children}</Content>
          <Analytics />
        </Providers>
      </body>
    </html >
  );
}

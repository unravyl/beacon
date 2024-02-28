import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserWrapper } from '@/context/UserContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beacon",
  description: "Personalize Career App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserWrapper>
        <body className={inter.className}>{children}</body>
      </UserWrapper>
    </html>
  );
}

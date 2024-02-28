import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { UserWrapper } from "@/context/UserContext";
import { AuthWrapper } from '@/context/AuthContext';

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
      <head>
        <meta charSet="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>Career Path</title>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </head>
      <AuthWrapper>
        <UserWrapper>
          <body className={`${inter.className} bg-[url('../assets/icons/LandPageBG.svg')]`}>{children}</body>
        </UserWrapper>
      </AuthWrapper>
    </html>
  );
}

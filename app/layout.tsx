"use client"
import { Inter } from "next/font/google";
import "./globals.css";

import ACursor from "./components/a-cursor";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Anda Pirate vCard</title>
        <meta name="description" content="List of links of Anda Pirate" />
      </head>
      <body className={inter.className}>
        {children}
        <ACursor />
        </body>
    </html>
  );
}

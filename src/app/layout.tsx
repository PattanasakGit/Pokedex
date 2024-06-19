import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import type { Metadata } from "next";
import store from '@app/store/store';
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Front-end Quiz By Pattanasak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  );
}

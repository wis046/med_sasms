import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import Navbar from "../components/ut/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sasms",
  description: "Connecting with Postgres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen flex flex-col justify-center items-center">
        <Navbar/>
        {children}
        </main>
      </body>
    </html>
  );
}

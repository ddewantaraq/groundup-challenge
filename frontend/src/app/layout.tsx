import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-source-sans-pro",
});

export const metadata: Metadata = {
  title: "Ground up Challenge - Alert system",
  description: "Alert system and monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSansPro.variable} font-sans antialiased bg-gray-50`}
        style={{ fontFamily: 'var(--font-source-sans-pro)' }}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

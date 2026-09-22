import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StyledComponentsRegistry } from "./StyledComponentsRegistry";
import "./globals.css";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Naskh_Arabic,
} from 'next/font/google';

const editorialFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-editorial',
  weight: ['400', '500', '600'],
});

const interfaceFont = Manrope({
  subsets: ['latin'],
  variable: '--font-interface',
});

const arabicFont = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopping Store",
  description: "Discover carefully selected products at Shopping Store.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
  lang="en"
  className={`
    ${editorialFont.variable}
    ${interfaceFont.variable}
    ${arabicFont.variable}
  `}
>
      <body><StyledComponentsRegistry>{children}</StyledComponentsRegistry></body>
    </html>
  );
}

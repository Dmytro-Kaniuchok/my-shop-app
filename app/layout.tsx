import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import ClientWrapper from "./clientWrapper";

export const metadata: Metadata = {
  title: "Магазин запчастин",
  description:
    "Запчастини для сільгосптехніки. Магазин якісних автозапчастин.,",
  icons: {
    icon: "/auto-service.svg",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

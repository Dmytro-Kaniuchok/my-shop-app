import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header/Header";
import ClientWrapper from "./clientWrapper";
import { ThemeProvider } from "@/src/context/ThemeProvider";

export const metadata: Metadata = {
  title: "Магазин запчастин",
  description: "Запчастини для сільгосптехніки. Магазин якісних автозапчастин.",
  icons: {
    icon: "/logo-img.svg",
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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${inter.variable}`}
    >
      <body>
        <ThemeProvider>
          <Header />
          <main>
            <ClientWrapper>{children}</ClientWrapper>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

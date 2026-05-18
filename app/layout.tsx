import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import ToastProvider from "@/src/components/ToastProvider/ToastProvider";

export const metadata: Metadata = {
  title: "Магазин запчастин",
  description: "Запчастини для сільгосптехніки. Магазин якісних автозапчастин.",
  icons: {
    icon: "/favicon-parts.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Header />

        <main>{children}</main>

        <Footer />

        <ToastProvider />
      </body>
    </html>
  );
}

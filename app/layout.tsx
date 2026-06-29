import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import ToastProvider from "@/src/components/ToastProvider/ToastProvider";
import { ThemeProvider } from "@/src/Theme/ThemeProvider";

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
    <html
      lang="uk"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
    (function() {
      try {
        var themeMode = localStorage.getItem('themeMode') || 'system';
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var theme = themeMode === 'light' || themeMode === 'dark' ? themeMode : systemTheme;

        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `}
        </Script>

        <ThemeProvider>
          <Header />

          <main>{children}</main>

          <Footer />

          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}

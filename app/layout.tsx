import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteTitle = "Wellington José de Lima | Analista de Sistemas e Desenvolvedor";
const siteDescription =
  "Apresentação profissional com foco em sistemas corporativos, desenvolvimento web, banco de dados e automação de processos.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wellington-nox-lima.github.io"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/brand-icon.png",
    shortcut: "/brand-icon.png",
    apple: "/brand-icon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://wellington-nox-lima.github.io",
    siteName: "Wellington José de Lima",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/brand-icon.png",
        width: 512,
        height: 512,
        alt: "Ícone WL",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/brand-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} bg-surface text-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

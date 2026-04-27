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

export const metadata: Metadata = {
  title: "Wellington José de Lima | Analista de Sistemas e Desenvolvedor",
  description:
    "Portfólio profissional com foco em sistemas corporativos, desenvolvimento web, banco de dados e automação de processos.",
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

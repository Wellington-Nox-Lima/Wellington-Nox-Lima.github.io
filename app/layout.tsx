import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://wellington-nox-lima.github.io";
const siteTitle = "Wellington José de Lima · Desenvolvedor .NET full stack";
const siteDescription =
  "Desenvolvedor .NET full stack num sistema de gestão para clínicas: agenda, prontuário, financeiro, autoatendimento e migração de dados. Migração de uma clínica de 45 dias para 12 horas, fotos de pacientes só com login e fim da cobrança em duplicidade.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: "Wellington José de Lima", url: siteUrl }],
  keywords: [
    "Desenvolvedor .NET",
    "C#",
    "ASP.NET Core",
    "Migração de dados",
    "ETL",
    "SQL Server",
    "PostgreSQL",
    "AWS",
    "SaaS",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Wellington José de Lima",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FB" },
    { media: "(prefers-color-scheme: dark)", color: "#080A10" },
  ],
};

// Aplica o tema antes da primeira pintura, para não piscar claro ao abrir no escuro.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

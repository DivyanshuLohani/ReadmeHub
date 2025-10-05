import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReadmeHub - The Ultimate README Contribution Platform",
  description: "Contribute to READMEs and become a Hacktoberfest legend!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <Analytics />
      </body>
    </html>
  );
}

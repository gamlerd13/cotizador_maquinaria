import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { companyData } from "@/constant/companyData";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: companyData.companyName,
  description: "Cotizador web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}

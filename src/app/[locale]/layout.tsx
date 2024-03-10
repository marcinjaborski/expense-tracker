import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

import Providers from "@/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense tracker",
  description: "Expense tracker description",
};

type RootLayoutProps = PropsWithChildren<{
  params: {
    locale: string;
  };
}>;

export default function RootLayout({ children = null, params: { locale } }: RootLayoutProps) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

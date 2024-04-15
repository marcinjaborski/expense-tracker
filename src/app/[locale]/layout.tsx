import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

import Providers from "@/Providers";
import { LocaleParams } from "@/utils/params";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense tracker",
  description: "Expense tracker description",
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  keywords: ["expenses", "tracker", "money", "debts"],
};

export default function RootLayout({ children = null, params: { locale } }: PropsWithChildren & LocaleParams) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

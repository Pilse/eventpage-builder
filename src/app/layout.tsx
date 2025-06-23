import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "PageIO",
  description: "Easiest way to build mobile page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#000"></meta>
      <body className={`${montserrat.className} flex flex-col`}>{children}</body>
    </html>
  );
}

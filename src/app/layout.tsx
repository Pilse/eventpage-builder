import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "pageio",
  description: "Easiest way to build mobile page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en">{children}</html>;
}

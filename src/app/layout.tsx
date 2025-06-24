import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PageIO",
  description: "Easiest way to build mobile page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en">{children}</html>;
}

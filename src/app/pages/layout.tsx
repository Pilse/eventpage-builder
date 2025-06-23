import type { Metadata } from "next";
import { Theme, ThemePanel } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "PageIO",
  description: "Easiest way to build mobile page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme accentColor="blue" radius="large" appearance="dark">
      <ThemePanel defaultOpen={false} />
      {children}
    </Theme>
  );
}

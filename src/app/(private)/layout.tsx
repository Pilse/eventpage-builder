import { SessionProvider } from "next-auth/react";
import { Theme } from "@radix-ui/themes";
import { Montserrat } from "next/font/google";
import { Viewport } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-montserrat",
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={`${montserrat.className} ${montserrat.variable} flex flex-col dark`}>
      <SessionProvider>
        <Theme accentColor="blue" radius="large" appearance="dark">
          {children}
        </Theme>
      </SessionProvider>
    </body>
  );
}

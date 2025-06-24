import { SessionProvider } from "next-auth/react";
import { Theme } from "@radix-ui/themes";
import { Montserrat } from "next/font/google";
import "../globals.css";
import "@radix-ui/themes/styles.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-montserrat",
});

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta name="theme-color" content="#000"></meta>

      <body className={`${montserrat.className} flex flex-col dark`}>
        <SessionProvider>
          <Theme accentColor="blue" radius="large" appearance="dark">
            {children}
          </Theme>
        </SessionProvider>
      </body>
    </>
  );
}

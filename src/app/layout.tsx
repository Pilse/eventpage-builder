import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Montserrat, Oswald, Poppins, Inter, Noto_Sans, Open_Sans, Roboto } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-notosans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-opensans",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Pageio",
  description: "The Easiest Way To Create Your Mobile Webpage",
  keywords: ["page", "pageio", "mobile", "webpage", "builder", "editor", "drag and drop"],
  icons:
    "https://pageio-upload.s3.ap-northeast-2.amazonaws.com/images/image.png-5e8f0af1-96f5-4f8c-b9d6-175857cbefa9",
  openGraph: {
    images:
      "https://pageio-upload.s3.ap-northeast-2.amazonaws.com/images/image.png-5e8f0af1-96f5-4f8c-b9d6-175857cbefa9",
    title: "Pageio",
    description: "The Easiest Way To Create Your Mobile Webpage",
    url: "https://www.pageio.com",
    siteName: "Pageio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pageio",
    description: "The Easiest Way To Create Your Mobile Webpage",
    images:
      "https://pageio-upload.s3.ap-northeast-2.amazonaws.com/images/image.png-5e8f0af1-96f5-4f8c-b9d6-175857cbefa9",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${montserrat.variable} ${poppins.variable} ${inter.variable} ${notoSans.variable} ${openSans.variable} ${roboto.variable}`}
    >
      {children}
    </html>
  );
}

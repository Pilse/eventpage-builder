import { BuilderPanelDemo } from "@/components/builder/panel/demo";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-montserrat",
});

export default function Demo() {
  return (
    <body className={`${montserrat.className} flex flex-col dark`}>
      <BuilderPanelDemo />
    </body>
  );
}

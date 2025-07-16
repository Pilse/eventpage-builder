import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Viewport } from "next";
import { TbMail } from "react-icons/tb";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-montserrat",
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function Home() {
  return (
    <body className={`${montserrat.className} flex flex-col dark`}>
      <div className="relative bg-black">
        <nav className="h-16 backdrop-blur-md w-full fixed bg-white/10 flex justify-between items-center z-10">
          <div className="flex items-center gap-2 ml-6">
            <Image src="/image/pageio.svg" width={10} height={25} alt="logo" />
            <span className="text-white text-base font-semibold">pageio</span>
            <span className="bg-amber-500/20 text-amber-500 text-sm font-medium px-2 py-1 rounded-md">
              beta
            </span>
          </div>

          <div className="flex items-center gap-6 mr-6">
            <Link
              href="/console"
              className="text-white hover:text-blue-400 bg-gray-600/30 py-2 px-4 rounded-lg text-sm hover:bg-blue-500/30 transition-all"
            >
              Start For Free
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-dvh object-cover w-full flex flex-col justify-start items-center p-4 pt-20 md:p-8 md:pt-36 bg-neutral-900">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 md:mb-32 whitespace-pre-line text-center">{`The Easiest Way 
To Create Your
Mobile Website`}</h1>
          <Image
            src="/image/pageiohero.png"
            width={1400}
            height={1200}
            alt="pageiohero"
            className="object-cover"
          />
        </section>

        {/* Footer Section */}
        <footer className="py-12 px-4 md:px-8 bg-black w-full">
          <div className=" text-center text-gray-400 flex flex-col gap-2 justify-center">
            <p>&copy; 2025 pageio. All rights reserved.</p>
            <p className="flex items-center gap-2 justify-center">
              <TbMail size={16} />{" "}
              <a href="mailto:gogosky1175@gmail.com" className="underline">
                gogosky1175@gmail.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </body>
  );
}

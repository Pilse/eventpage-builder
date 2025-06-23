import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative bg-black">
      <nav className="h-16 backdrop-blur-md w-full fixed bg-white/10 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 ml-4">
          <Image src="/image/pageio.svg" width={30} height={30} alt="logo" />
          <span className="text-white text-lg font-medium">PageIO</span>
        </div>
        <div className="flex items-center gap-6 mr-4">
          <Link
            href="/pages"
            className="text-white hover:text-blue-400 bg-gray-600/30 py-2 px-4 rounded-lg text-sm hover:bg-blue-500/30 transition-all"
          >
            Start For Free
          </Link>
        </div>
      </nav>
      <div
        className="min-h-dvh object-cover w-full flex flex-col justify-center md:justify-start items-center p-4 pt-20 md:p-8 md:pt-36"
        style={{ background: "url(/image/hero-bg.png)" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 md:mb-40 whitespace-pre-line">{`The Easiest Way 
To Create Your
Mobile Webpage`}</h1>
        <Image src="/image/hero.png" width={1400} height={1200} alt="hero" className="object-cover" />
      </div>
    </div>
  );
}

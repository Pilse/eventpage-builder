import { getPage, getPublishedPages } from "@/service/pages";
import { Renderer } from "@/components/builder/renderer";
import "@/app/globals.css";
import { notFound } from "next/navigation";
import { Container } from "@/domain/builder";
import { rgbaToCss, rgbaToHexColor } from "@/shared/util/color";

export const generateStaticParams = async () => {
  const pages = await getPublishedPages();

  if (!pages) {
    return [];
  }

  return pages.map((page) => ({ pageid: page.publicId }));
};

export const generateViewport = async ({ params }: { params: Promise<{ pageid: string }> }) => {
  const { pageid } = await params;
  const page = await getPage(pageid);

  if (!page) {
    return {};
  }

  const container = page.page as ReturnType<Container["serialize"]>;

  return {
    themeColor: `#${rgbaToHexColor(container.backgroundColor)}`,
    width: container.width,
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
  };
};

export default async function Home({ params }: { params: Promise<{ pageid: string }> }) {
  const { pageid } = await params;

  const page = await getPage(pageid);
  if (!page) {
    return notFound();
  }

  const container = page.page as ReturnType<Container["serialize"]>;

  return (
    <body style={{ backgroundColor: `${rgbaToCss(container.backgroundColor)}` }}>
      <Renderer block={container} />
    </body>
  );
}

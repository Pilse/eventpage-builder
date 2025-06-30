import { getPage, getPages, getPublishedPages } from "@/service/pages";
import { Renderer } from "@/components/builder/renderer";
import { Suspense } from "react";
import "@/app/globals.css";
import { notFound } from "next/navigation";
import { rgbaToHexColor } from "@/shared/util/color";

export const generateStaticParams = async () => {
  const pages = await getPublishedPages();

  if (!pages) {
    return [];
  }

  return pages.map((page) => ({ pageid: page.publicId }));
};

export default async function Home({ params }: { params: Promise<{ pageid: string }> }) {
  const { pageid } = await params;

  const page = await getPage(pageid);
  if (!page) {
    return notFound();
  }

  return (
    <>
      <body>
        <Renderer page={page} />
      </body>
    </>
  );
}

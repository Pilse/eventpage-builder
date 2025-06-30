import { getPage } from "@/service/pages";
import { Renderer } from "@/components/builder/renderer";
import { Suspense } from "react";
import "@/app/globals.css";
import { notFound } from "next/navigation";

export default async function Preview({ params }: { params: Promise<{ pageid: string }> }) {
  const { pageid } = await params;

  const page = await getPage(pageid);
  if (!page) {
    return notFound();
  }

  return (
    <body>
      <Renderer page={page} />
    </body>
  );
}

import { getPage } from "@/service/pages";
import { Renderer } from "@/components/builder/renderer";
import { Suspense } from "react";
import "@/app/globals.css";

export default async function Preview({ params }: { params: Promise<{ pageid: string }> }) {
  const { pageid } = await params;

  const pagePromise = getPage(pageid);

  return (
    <Suspense fallback={<></>}>
      <Renderer pagePromise={pagePromise} />
    </Suspense>
  );
}

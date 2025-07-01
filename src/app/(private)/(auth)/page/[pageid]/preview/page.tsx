import { getPage } from "@/service/pages";
import { Renderer } from "@/components/builder/renderer";
import { notFound } from "next/navigation";
import { Container } from "@/domain/builder";

export default async function Preview({ params }: { params: Promise<{ pageid: string }> }) {
  const { pageid } = await params;

  const page = await getPage(pageid);
  if (!page) {
    return notFound();
  }

  const container = page.block as ReturnType<Container["serialize"]>;

  return <Renderer block={container} />;
}

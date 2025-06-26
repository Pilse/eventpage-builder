import { BuilderPanel, BlockPanelSkelton } from "@/components/builder/panel";
import { getPage } from "@/service/pages";
import { auth } from "@/shared/auth";
import { Suspense } from "react";

export default async function NewBuilder({ params }: { params: Promise<{ pageid: string }> }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const { pageid } = await params;

  const pagePromise = getPage(pageid, userId);

  return (
    <Suspense fallback={<BlockPanelSkelton />}>
      <BuilderPanel pagePromise={pagePromise} />
    </Suspense>
  );
}

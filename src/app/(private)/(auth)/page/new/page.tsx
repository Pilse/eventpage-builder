import { NewBuildePage } from "@/components/builder/new-builder-page";
import { sampleContainer } from "@/mock";
import { createPage } from "@/service/pages";
import { auth } from "@/shared/auth";
import Image from "next/image";
import { Suspense } from "react";

export default async function NewBuilder() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }

  const createPagePromise = createPage({
    userId,
    name: `New Page`,
    serialized: sampleContainer,
  });

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <Image src="/image/pageio.svg" width={30} height={30} alt="pageio" className="animate-spin" />
        </div>
      }
    >
      <NewBuildePage createPagePromise={createPagePromise} />
    </Suspense>
  );
}

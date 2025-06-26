"use client";

import { createPage } from "@/service/pages";
import { revalidatePathServerAction } from "@/shared/revalidate-path-server-action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useLayoutEffect } from "react";

interface INewBuilderPageProps {
  createPagePromise: ReturnType<typeof createPage>;
}

export const NewBuildePage = ({ createPagePromise }: INewBuilderPageProps) => {
  const creaetPageRes = use(createPagePromise);
  const router = useRouter();

  useLayoutEffect(() => {
    revalidatePathServerAction("/console");
    if (!creaetPageRes) {
      router.replace("/console");
    } else {
      router.replace(`/page/${creaetPageRes.publicId}`);
    }
  }, [creaetPageRes, router]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Image src="/image/pageio.svg" width={30} height={30} alt="pageio" className="animate-spin" />
    </div>
  );
};

"use client";

import { sampleContainer } from "@/mock";
import { createPage } from "@/service/pages";
import { revalidatePathServerAction } from "@/shared/revalidate-path-server-action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function NewBuilder() {
  const { data: session } = useSession();
  const router = useRouter();
  const called = useRef(false);

  useEffect(() => {
    if (!session) {
      router.replace("/console");
      return;
    }

    if (called.current) {
      return;
    }
    called.current = true;

    createPage({
      userId: session.user?.id ?? "",
      name: "Untitled",
      serialized: sampleContainer,
    }).then((creaetPageRes) => {
      revalidatePathServerAction("/console");
      if (!creaetPageRes) {
        router.replace("/console");
      } else {
        router.replace(`/page/${creaetPageRes.publicId}`);
      }
    });
  }, [router, session]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Image src="/image/pageio.svg" width={30} height={30} alt="pageio" className="animate-spin" />
    </div>
  );
}

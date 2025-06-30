"use client";

import { getPage } from "@/service/pages";
import { useRouter } from "next/navigation";
import { use, useLayoutEffect } from "react";
import { RendererFactory } from "./block";
import { BlockFactory, Container } from "@/domain/builder";

interface IRendererProps {
  page: Awaited<ReturnType<typeof getPage>>;
}

export const Renderer = ({ page }: IRendererProps) => {
  const router = useRouter();

  useLayoutEffect(() => {
    if (!page) {
      router.replace("/");
    }
  }, [page, router]);

  if (!page) {
    return null;
  }

  return (
    <RendererFactory
      block={BlockFactory.deserialize(page.block as ReturnType<Container["serialize"]>, null)}
    />
  );
};

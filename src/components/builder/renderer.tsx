"use client";

import { getPage } from "@/service/pages";
import { useRouter } from "next/navigation";
import { use, useLayoutEffect } from "react";
import { RendererFactory } from "./block";
import { BlockFactory, Container } from "@/domain/builder";

interface IRendererProps {
  pagePromise: ReturnType<typeof getPage>;
}

export const Renderer = ({ pagePromise }: IRendererProps) => {
  const pageData = use(pagePromise);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!pageData) {
      router.replace("/");
    }
  }, [pageData, router]);

  if (!pageData) {
    return null;
  }

  return (
    <RendererFactory
      block={BlockFactory.deserialize(pageData.block as ReturnType<Container["serialize"]>, null)}
    />
  );
};

"use client";

import { Container } from "@/component/block";
import { BlockFactory, ContainerBlock } from "@/domain/block";
import { sampleContainer } from "@/mock";

export default function Home() {
  return (
    <Container
      block={BlockFactory.deserialize(sampleContainer, null) as InstanceType<typeof ContainerBlock>}
    />
  );
}

"use client";

import { BlockFactory } from "@/component/block";
import { BlockFactory as BlockFactoryDomain, ContainerBlock } from "@/domain/block";
import { BlockHistoryProvider } from "@/hooks/use-block-history";
import { sampleContainer } from "@/mock";

export default function Home() {
  return (
    <BlockHistoryProvider
      root={BlockFactoryDomain.deserialize(sampleContainer, null) as InstanceType<typeof ContainerBlock>}
    >
      {({ root }) => {
        return <BlockFactory key={JSON.stringify(root.serialize())} block={root} />;
      }}
    </BlockHistoryProvider>
  );
}

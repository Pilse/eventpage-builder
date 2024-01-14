"use client";

import { Section } from "@/component/block";
import { BlockFactory, SectionBlock } from "@/domain/block";
import { sampleSection1, sampleSection2 } from "@/mock";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start gap-2">
      <DndProvider backend={HTML5Backend}>
        <Section
          block={BlockFactory.deserialize(sampleSection1, null) as InstanceType<typeof SectionBlock>}
        />
      </DndProvider>

      <DndProvider backend={HTML5Backend}>
        <Section
          block={BlockFactory.deserialize(sampleSection2, null) as InstanceType<typeof SectionBlock>}
        />
      </DndProvider>
    </main>
  );
}

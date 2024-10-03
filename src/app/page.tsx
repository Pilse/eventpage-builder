"use client";

import { Section } from "@/component/block";
import { BlockFactory, SectionBlock } from "@/domain/block";
import { useGlobalContext } from "@/hooks";
import { sampleSection1, sampleSection2 } from "@/mock";
import { hasChildrenMixin } from "@/util";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useHotkeys } from "react-hotkeys-hook";

export default function Home() {
  const globalContext = useGlobalContext();

  useHotkeys("backspace", () => {
    const block = globalContext.currentBlock;
    if (!block) {
      return;
    }

    const parent = block.parent;
    if (parent && hasChildrenMixin(parent)) {
      parent.removeChild(block);
    }
  });

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

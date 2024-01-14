"use client";

import { Section } from "@/component/block";
import { FrameBlock, SectionBlock, TextBlock } from "@/domain/block";
import { useLayoutEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const [sectionSample1, setSectionSample1] = useState<InstanceType<typeof SectionBlock> | null>(null);
  const [sectionSample2, setSectionSample2] = useState<InstanceType<typeof SectionBlock> | null>(null);

  useLayoutEffect(() => {
    setSectionSample1(sample);
    setSectionSample2(sample2);
  }, []);

  return (
    <main className="flex flex-col items-center justify-start gap-2">
      {sectionSample1 && (
        <DndProvider backend={HTML5Backend}>
          <Section block={sectionSample1} />
        </DndProvider>
      )}
      {sectionSample2 && (
        <DndProvider backend={HTML5Backend}>
          <Section block={sectionSample2} />
        </DndProvider>
      )}
    </main>
  );
}

const sample = new SectionBlock({
  width: 700,
  height: 800,
  children: [
    new TextBlock({ content: "hello world", t: 500, l: 50, width: 100, height: 50 }),
    new TextBlock({ content: "with", t: 600, l: 50, width: 100, height: 50 }),
    new TextBlock({ content: "nextjs", t: 700, l: 50, width: 100, height: 50 }),
    new FrameBlock({
      width: 100,
      height: 300,
      t: 200,
      l: 120,
      children: [
        new TextBlock({ content: "content in frame1", l: 5, r: 10, width: 20, height: 50 }),
        new TextBlock({ content: "content in frame2", l: 5, t: 100, width: 20, height: 50 }),
      ],
    }),
    new FrameBlock({
      width: 100,
      height: 300,
      t: 300,
      l: 60,
      children: [
        new TextBlock({ content: "content in frame1", l: 5, r: 10, width: 20, height: 50 }),
        new TextBlock({ content: "content in frame2", l: 5, t: 100, width: 20, height: 50 }),
      ],
    }),
  ],
});

const sample2 = new SectionBlock({
  width: 700,
  height: 800,
  children: [
    new TextBlock({ content: "hello world", t: 500, l: 50, width: 100, height: 50 }),
    new TextBlock({ content: "with", t: 600, l: 50, width: 100, height: 50 }),
    new TextBlock({ content: "nextjs", t: 700, l: 50, width: 100, height: 50 }),
    new FrameBlock({
      width: 100,
      height: 300,
      t: 200,
      l: 120,
      children: [
        new TextBlock({ content: "content in frame1", l: 5, r: 10, width: 20, height: 50 }),
        new TextBlock({ content: "content in frame2", l: 5, t: 100, width: 20, height: 50 }),
      ],
    }),
    new FrameBlock({
      width: 100,
      height: 300,
      t: 300,
      l: 60,
      children: [
        new TextBlock({ content: "content in frame1", l: 5, r: 10, width: 20, height: 50 }),
        new TextBlock({ content: "content in frame2", l: 5, t: 100, width: 20, height: 50 }),
      ],
    }),
  ],
});

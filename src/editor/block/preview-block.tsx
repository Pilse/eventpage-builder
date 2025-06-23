import { Block } from "@/domain/block";
import { BlockFactory } from "@/editor/block";
import { twMerge } from "tailwind-merge";
import { isAutoLayouted } from "@/util";

interface IPreviewBlock {
  block: InstanceType<typeof Block>;
}

export const PreviewBlock = ({ block }: IPreviewBlock) => {
  return (
    <div className={twMerge("absolute pointer-events-none", isAutoLayouted(block) && "opacity-30")}>
      <BlockFactory block={block} isPreview />
    </div>
  );
};

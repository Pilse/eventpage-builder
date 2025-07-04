import { Block } from "@/domain/builder";
import { BlockFactory } from "@/components/builder/block";
import { twMerge } from "tailwind-merge";
import { isAutoLayouted } from "@/shared/util";

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

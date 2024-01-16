import { Block } from "@/domain/block";
import { BlockFactory } from "@/component/block";

interface IPreviewBlock {
  block: InstanceType<typeof Block>;
}

export const PreviewBlock = ({ block }: IPreviewBlock) => {
  return (
    <div className="absolute pointer-events-none">
      <BlockFactory block={block} isPreview />
    </div>
  );
};

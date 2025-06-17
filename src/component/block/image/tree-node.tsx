import { ImageBlock } from "@/domain/block";
import { useFrameTreeDrop } from "../use-frame-tree-drop";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/component/tree";
import { FrameIcon } from "@radix-ui/react-icons";
import { useLeafTreeDrop } from "../use-leaf-tree-drop";
import { LuImage } from "react-icons/lu";

interface IImageNodeTreeProps {
  block: InstanceType<typeof ImageBlock>;
  depth: number;
}

export const ImageTreeNode = ({ block: blockInstance, depth }: IImageNodeTreeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block });
  const { canDrop, dropRef, treeNodeRef } = useLeafTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<LuImage />}
      name="Image"
      depth={depth}
      dragRef={dragRef}
      dropRef={dropRef}
      previewRef={previewRef}
      treeNodeRef={treeNodeRef}
      canDrop={canDrop}
      isDragging={isDragging}
    />
  );
};

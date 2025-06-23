import { ImageBlock } from "@/domain/block";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/editor/tree";
import { ImageIcon } from "@radix-ui/react-icons";
import { useLeafTreeDrop } from "../use-leaf-tree-drop";

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
      icon={<ImageIcon width={14} height={14} />}
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

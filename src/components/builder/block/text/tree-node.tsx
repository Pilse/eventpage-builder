import { TextBlock } from "@/domain/builder";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/components/builder/tree";
import { useLeafTreeDrop } from "../use-leaf-tree-drop";
import { TextIcon } from "@radix-ui/react-icons";

interface ITextTreeNodeProps {
  block: InstanceType<typeof TextBlock>;
  depth: number;
}

export const TextTreeNode = ({ block: blockInstance, depth }: ITextTreeNodeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block });
  const { canDrop, dropRef, treeNodeRef } = useLeafTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<TextIcon />}
      name="Text"
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

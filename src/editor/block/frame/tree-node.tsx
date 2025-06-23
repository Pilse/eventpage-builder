import { FrameBlock } from "@/domain/block";
import { useFrameTreeDrop } from "../use-frame-tree-drop";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/editor/tree";
import { FrameIcon } from "@radix-ui/react-icons";

interface IFrameCanvasNodeTreeProps {
  block: InstanceType<typeof FrameBlock>;
  depth: number;
}

export const FrameCanvasTreeNode = ({ block: blockInstance, depth }: IFrameCanvasNodeTreeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block });
  const { canDrop, dropRef, treeNodeRef } = useFrameTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<FrameIcon />}
      name="Frame"
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

import { FrameColBlock } from "@/domain/block";
import { useFrameTreeDrop } from "../use-frame-tree-drop";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/components/builder/tree";
import { TbLayoutList } from "react-icons/tb";

interface IFrameColNodeTreeProps {
  block: InstanceType<typeof FrameColBlock>;
  depth: number;
}

export const FrameColTreeNode = ({ block: blockInstance, depth }: IFrameColNodeTreeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block });
  const { canDrop, dropRef, treeNodeRef } = useFrameTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<TbLayoutList />}
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

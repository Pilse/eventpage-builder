import { FrameRowBlock } from "@/domain/block";
import { useFrameTreeDrop } from "../use-frame-tree-drop";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/components/builder/tree";
import { TbLayoutList } from "react-icons/tb";

interface IFrameRowNodeTreeProps {
  block: InstanceType<typeof FrameRowBlock>;
  depth: number;
}

export const FrameRowTreeNode = ({ block: blockInstance, depth }: IFrameRowNodeTreeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block });
  const { canDrop, dropRef, treeNodeRef } = useFrameTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<TbLayoutList className="rotate-90" />}
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

import { SectionRowBlock } from "@/domain/block";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/component/tree";
import { useSectionTreeDrop } from "../use-section-tree-drop";
import { HiViewColumns } from "react-icons/hi2";

interface ISectionRowTreeNodeProps {
  block: InstanceType<typeof SectionRowBlock>;
  depth: number;
}

export const SectionRowTreeNode = ({ block: blockInstance, depth }: ISectionRowTreeNodeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block });
  const { canDrop, dropRef, treeNodeRef } = useSectionTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<HiViewColumns />}
      name="Section"
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

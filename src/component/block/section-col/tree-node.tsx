import { SectionColBlock } from "@/domain/block";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/component/tree";
import { useSectionTreeDrop } from "../use-section-tree-drop";
import { HiViewColumns } from "react-icons/hi2";

interface ISectionColTreeNodeProps {
  block: InstanceType<typeof SectionColBlock>;
  depth: number;
}

export const SectionColTreeNode = ({ block: blockInstance, depth }: ISectionColTreeNodeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block });
  const { canDrop, dropRef, treeNodeRef } = useSectionTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<HiViewColumns className="rotate-90" />}
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

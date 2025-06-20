import { SectionColBlock } from "@/domain/block";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/component/tree";
import { useSectionTreeDrop } from "../use-section-tree-drop";
import { RowsIcon } from "@radix-ui/react-icons";

interface ISectionColTreeNodeProps {
  block: InstanceType<typeof SectionColBlock>;
  depth: number;
}

export const SectionColTreeNode = ({ block: blockInstance, depth }: ISectionColTreeNodeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block, dragType: "SECTION" });
  const { canDrop, dropRef, treeNodeRef } = useSectionTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<RowsIcon width={14} height={14} />}
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

import { SectionRowBlock } from "@/domain/block";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/editor/tree";
import { useSectionTreeDrop } from "../use-section-tree-drop";
import { HiViewColumns } from "react-icons/hi2";
import { ColumnsIcon } from "@radix-ui/react-icons";

interface ISectionRowTreeNodeProps {
  block: InstanceType<typeof SectionRowBlock>;
  depth: number;
}

export const SectionRowTreeNode = ({ block: blockInstance, depth }: ISectionRowTreeNodeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block, dragType: "SECTION" });
  const { canDrop, dropRef, treeNodeRef } = useSectionTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<ColumnsIcon width={14} height={14} />}
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

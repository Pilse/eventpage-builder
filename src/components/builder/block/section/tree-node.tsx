import { SectionBlock } from "@/domain/block";
import { useDomain } from "@/hooks";
import { TreeNode, useDefaultTreeDrag } from "@/components/builder/tree";
import { TbRectangle } from "react-icons/tb";
import { useSectionTreeDrop } from "../use-section-tree-drop";
import { BoxIcon } from "@radix-ui/react-icons";

interface ISectionCanvasTreeNodeProps {
  block: InstanceType<typeof SectionBlock>;
  depth: number;
}

export const SectionCanvasTreeNode = ({ block: blockInstance, depth }: ISectionCanvasTreeNodeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const [{ isDragging }, dragRef, previewRef] = useDefaultTreeDrag({ block, dragType: "SECTION" });
  const { canDrop, dropRef, treeNodeRef } = useSectionTreeDrop(block);

  return (
    <TreeNode
      block={block}
      icon={<BoxIcon width={14} height={14} />}
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

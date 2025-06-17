import { ContainerBlock } from "@/domain/block";
import { useDomain } from "@/hooks";
import { TreeNode } from "@/component/tree";
import { MdOutlineWebAsset } from "react-icons/md";
import { useRef } from "react";

interface IContainerTreeNodeProps {
  block: InstanceType<typeof ContainerBlock>;
  depth: number;
}

export const ContainerTreeNode = ({ block: blockInstance, depth }: IContainerTreeNodeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const treeNodeRef = useRef<HTMLElement | null>(null);

  return (
    <TreeNode
      block={block}
      icon={<MdOutlineWebAsset />}
      name="Page"
      depth={depth}
      dragRef={() => null}
      dropRef={() => null}
      previewRef={() => null}
      treeNodeRef={treeNodeRef}
      canDrop={false}
      isDragging={false}
    />
  );
};

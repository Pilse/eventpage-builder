import { ContainerBlock } from "@/domain/block";
import { useDomain, useGlobalContext, useNewBlock } from "@/hooks";
import { TreeNode } from "@/editor/tree";
import { MdOutlineWebAsset } from "react-icons/md";
import { useRef } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { TbPlus } from "react-icons/tb";
import { flushSync } from "react-dom";

interface IContainerTreeNodeProps {
  block: InstanceType<typeof ContainerBlock>;
  depth: number;
}

export const ContainerTreeNode = ({ block: blockInstance, depth }: IContainerTreeNodeProps) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const { addNewBlock } = useNewBlock();
  const treeNodeRef = useRef<HTMLElement | null>(null);

  return (
    <>
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
      <Button
        variant="surface"
        color="gray"
        className="-mx-2"
        onClick={() => {
          addNewBlock("SECTION_CANVAS", { height: 300 }, blockInstance);
        }}
      >
        <Flex align="center" gap="1">
          <TbPlus />
          <Text> Add Section</Text>
        </Flex>
      </Button>
    </>
  );
};

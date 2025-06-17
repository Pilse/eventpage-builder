import { Block } from "@/domain/block";
import { useGlobalContext } from "@/hooks";
import { hasChildrenMixin } from "@/util";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import {
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { ConnectableElement, ConnectDragPreview, DragSourceOptions } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { RiArrowDropDownLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { TreeNodeFactory } from "../block";

interface ITreeNodeProps {
  block: Block;
  depth: number;
  icon: ReactNode;
  name: ReactNode;
  treeNodeRef: MutableRefObject<HTMLElement | null>;
  dragRef: (
    elementOrNode: ConnectableElement,
    options?: DragSourceOptions | undefined
  ) => ReactElement | null;
  dropRef: (elementOrNode: ConnectableElement, options?: any) => ReactElement | null;
  previewRef: ConnectDragPreview;
  isDragging: boolean;
  canDrop: boolean;
}

export const TreeNode = ({
  block,
  depth,
  icon,
  name,
  treeNodeRef,
  dragRef,
  dropRef,
  previewRef,
  isDragging,
  canDrop,
}: ITreeNodeProps) => {
  const { currentBlock, setCurrentBlock } = useGlobalContext();
  const [showChildren, setShowChildren] = useState(true);

  const isCurrentHovered = useMemo(() => {
    if (!hasChildrenMixin(block)) {
      return block.isHovered;
    }

    return block.isHovered && ![...block].some((child) => child.isHovered);
  }, [block]);

  return (
    <Flex direction="column" gap="3" className="relative">
      <Box
        position="absolute"
        className={twMerge(
          "-top-1.5 -bottom-1.5 -left-3 -right-3 pointer-events-none",
          currentBlock?.id === block.id && "bg-[#deeeff14] rounded-lg"
        )}
      ></Box>
      <Button
        ref={(ele) => {
          treeNodeRef.current = ele;
        }}
        color="gray"
        variant="ghost"
        size="2"
        style={{
          background: currentBlock?.id === block.id ? "#deeeff32" : isCurrentHovered ? "#deeeff14" : "",
          opacity: !isDragging || canDrop ? 1 : 0.7,
        }}
        onMouseEnter={() => {
          block.isHovered = true;
        }}
        onMouseLeave={() => {
          block.isHovered = false;
        }}
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest(".arrow-down")) {
            setShowChildren((prev) => !prev);
          } else {
            setCurrentBlock(block);
          }
        }}
      >
        <div
          ref={(ele) => {
            dragRef(ele);
            dropRef(ele);
            previewRef(getEmptyImage());
          }}
          className={twMerge(
            "w-full relative flex items-center gap-1 border-2 border-transparent rounded",
            block.hoveredDir === "top" && " border-t-[#104D87]",
            block.hoveredDir === "bottom" && " border-b-[#104D87]",
            block.hoveredDir === "center" && " border-[#104D87] bg-[#104d8741]"
          )}
          style={{
            paddingLeft: depth * 10,
          }}
        >
          {hasChildrenMixin(block) && (
            <RiArrowDropDownLine
              size={24}
              className={twMerge("p-1 -m-1 -ml-6 arrow-down", !showChildren && "-rotate-90")}
            />
          )}

          {icon}
          <Text as="span" size="2" weight="medium">
            {name}
          </Text>
        </div>
      </Button>
      {showChildren &&
        hasChildrenMixin(block) &&
        block.children.map((child) => <TreeNodeFactory key={child.id} block={child} depth={depth + 1} />)}
    </Flex>
  );
};

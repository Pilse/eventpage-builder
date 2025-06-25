import { Block } from "@/domain/builder";
import { Box, Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { FrameIcon, TextIcon } from "@radix-ui/react-icons";
import { TbLayoutList } from "react-icons/tb";
import { LuImage } from "react-icons/lu";
import { hasChildrenMixin } from "@/util";
import { HiViewColumns } from "react-icons/hi2";
import { PiRectangleDuotone } from "react-icons/pi";
import { RiArrowDownSLine, RiArrowDropDownFill, RiArrowDropDownLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { useGlobalContext } from "@/hooks";
import { TreeNodeFactory } from "../block";

const treeNodeMap: Record<Block["type"], { icon: ReactNode; name: string }> = {
  CONTAINER: {
    icon: <></>,
    name: "CONTAINER",
  },
  BLOCK: {
    icon: <></>,
    name: "BLOCK",
  },
  FRAME_CANVAS: {
    icon: <FrameIcon />,
    name: "Frame",
  },
  FRAME_COL: {
    icon: <TbLayoutList />,
    name: "Frame",
  },
  FRAME_ROW: {
    icon: <TbLayoutList className="rotate-90" />,
    name: "Frame",
  },
  SECTION_CANVAS: {
    icon: <PiRectangleDuotone />,
    name: "Section",
  },
  SECTION_COL: {
    icon: <HiViewColumns className="rotate-90" />,
    name: "Section",
  },
  SECTION_ROW: {
    icon: <HiViewColumns />,
    name: "Section",
  },
  IMAGE: {
    icon: <LuImage />,
    name: "Image",
  },
  TEXT: {
    icon: <TextIcon />,
    name: "Text",
  },
};

interface IDefaultTreeNodeProps {
  block: Block;
  depth: number;
}

export const DefaultTreeNode = ({ block, depth }: IDefaultTreeNodeProps) => {
  const { setCurrentBlock, currentBlock } = useGlobalContext();
  const [showChildren, setShowChildren] = useState(true);

  return (
    <Flex direction="column" gap="3" className="relative">
      <Box
        position="absolute"
        className={twMerge(
          "-top-1.5 -bottom-1.5 -left-3 -right-3",
          currentBlock?.id === block.id && "bg-[#deeeff14] rounded-lg"
        )}
      ></Box>
      <Button
        color="gray"
        variant="ghost"
        size="2"
        style={{ background: currentBlock?.id === block.id ? "#deeeff32" : "" }}
      >
        <Flex
          className="w-full relative"
          justify="start"
          align="center"
          gap="1"
          style={{
            paddingLeft: depth * 20,
          }}
        >
          {hasChildrenMixin(block) && (
            <RiArrowDropDownLine
              size={24}
              className={twMerge("p-1 -m-1 -ml-6", !showChildren && "-rotate-90")}
              onClick={() => setShowChildren((prev) => !prev)}
            />
          )}
          {treeNodeMap[block.type].icon}
          <Text as="span" size="2">
            {treeNodeMap[block.type].name}
          </Text>
        </Flex>
      </Button>

      {showChildren &&
        hasChildrenMixin(block) &&
        block.children.map((child) => <TreeNodeFactory key={child.id} block={child} depth={depth + 1} />)}
    </Flex>
  );
};

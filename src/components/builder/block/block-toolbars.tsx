import { useBlockHistory, useNewBlock } from "@/hooks";
import { BlockType } from "@/type";
import { FrameIcon, ImageIcon, TextIcon } from "@radix-ui/react-icons";
import { Card, Flex, IconButton, Separator, Strong, Text } from "@radix-ui/themes";
import { MouseEvent } from "react";
import { GrRedo, GrUndo } from "react-icons/gr";
import { TbPlayerPlay } from "react-icons/tb";
import { useRouter } from "next/navigation";

export const BlockToolbars = ({ pageId }: { pageId: string }) => {
  const router = useRouter();
  const { isAddable, addNewBlock } = useNewBlock();
  const { redo, undo } = useBlockHistory();

  const handleClick = (e: MouseEvent, type: BlockType) => {
    e.stopPropagation();
    if (!isAddable) {
      return;
    }
    addNewBlock(type, {});
  };

  return (
    <Card style={{ boxShadow: "var(--shadow-5)", backgroundColor: "#131314", paddingTop: 8 }}>
      <Flex gap="1" align="center">
        <Flex direction="column" gap="2" align="center">
          <Text size="1" color="gray">
            Frame
          </Text>
          <IconButton
            size="3"
            variant="soft"
            color="gray"
            disabled={!isAddable}
            onClick={(e) => handleClick(e, "FRAME_CANVAS")}
          >
            <FrameIcon width={20} height={20} />
          </IconButton>
        </Flex>

        <Flex direction="column" gap="2" align="center">
          <Text size="1" color="gray">
            Text
          </Text>
          <IconButton
            size="3"
            variant="soft"
            color="gray"
            disabled={!isAddable}
            onClick={(e) => handleClick(e, "TEXT")}
          >
            <TextIcon width={20} height={20} />
          </IconButton>
        </Flex>

        <Flex direction="column" gap="2" align="center">
          <Text size="1" color="gray">
            Image
          </Text>
          <IconButton
            size="3"
            variant="soft"
            color="gray"
            disabled={!isAddable}
            onClick={(e) => handleClick(e, "IMAGE")}
          >
            <ImageIcon width={20} height={20} />
          </IconButton>
        </Flex>

        <Separator orientation="vertical" size="2" mx="2" />

        <Flex direction="column" gap="2" align="center">
          <Text size="1" color="gray">
            Undo
          </Text>
          <IconButton size="3" variant="soft" color="gray" onClick={undo}>
            <GrUndo size={20} />
          </IconButton>
        </Flex>
        <Flex direction="column" gap="2" align="center">
          <Text size="1" color="gray">
            Redo
          </Text>
          <IconButton size="3" variant="soft" color="gray" onClick={redo}>
            <GrRedo size={20} />
          </IconButton>
        </Flex>

        <Separator orientation="vertical" size="2" mx="2" />

        <Flex direction="column" gap="2" align="center">
          <Text size="1" color="gray">
            Preview
          </Text>
          <IconButton
            size="3"
            variant="soft"
            color="gray"
            onClick={() => router.push(`/page/${pageId}/preview`)}
          >
            <TbPlayerPlay />
          </IconButton>
        </Flex>
      </Flex>
    </Card>
  );
};

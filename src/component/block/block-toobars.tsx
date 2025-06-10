import { useNewBlock } from "@/hooks";
import { BlockType } from "@/type";
import { hexColorToRgba } from "@/util/color";
import { FrameIcon, TextIcon } from "@radix-ui/react-icons";
import { Card, Flex, IconButton, Inset, Separator } from "@radix-ui/themes";
import { MouseEvent } from "react";
import { GrRedo, GrUndo } from "react-icons/gr";

export const BlockToolbars = () => {
  const { isAddable, addNewBlock } = useNewBlock();

  const handleClick = (e: MouseEvent, type: BlockType) => {
    e.stopPropagation();
    if (!isAddable) {
      return;
    }
    addNewBlock(type, {
      backgroundColor:
        type === "FRAME_CANVAS" || type === "FRAME_ROW" || type === "FRAME_COL"
          ? hexColorToRgba("DDDDDD")
          : hexColorToRgba("FFFFFF"),
    });
  };

  return (
    <Card style={{ boxShadow: "var(--shadow-5)", backgroundColor: "#1A191B" }}>
      <Flex gap="1" align="center">
        {isAddable && (
          <>
            <IconButton size="3" variant="soft" color="gray" onClick={(e) => handleClick(e, "FRAME_CANVAS")}>
              <FrameIcon width={20} height={20} />
            </IconButton>

            <IconButton size="3" variant="soft" color="gray" onClick={(e) => handleClick(e, "TEXT")}>
              <TextIcon width={20} height={20} />
            </IconButton>
            <Separator orientation="vertical" size="2" mx="2" />
          </>
        )}
        <IconButton size="3" variant="soft" color="gray">
          <GrUndo size={20} />
        </IconButton>
        <IconButton size="3" variant="soft" color="gray">
          <GrRedo size={20} />
        </IconButton>
      </Flex>
    </Card>
  );
};

import { Block } from "@/domain/builder/block";
import { ContextMenu } from "@radix-ui/themes";
import { FrameIcon, ImageIcon, TextIcon } from "@radix-ui/react-icons";
import { PropsWithChildren } from "react";
import { useCopyPasteBlock, useDeleteBlock, useNewBlock } from "@/hooks";
import { hasChildrenMixin } from "@/shared/util";

interface BlockContextMenuProps extends PropsWithChildren {
  block: Block;
}

export const BlockContextMenu = ({ block, children }: BlockContextMenuProps) => {
  const { copyBlock, pasteBlock } = useCopyPasteBlock();
  const { addNewBlock } = useNewBlock();
  const { deleteBlock } = useDeleteBlock();

  const handleAddBlock = async (type: Block["type"]) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    addNewBlock(
      type,
      {},
      hasChildrenMixin(block)
        ? block
        : block.parent
        ? hasChildrenMixin(block.parent)
          ? block.parent
          : undefined
        : undefined,
      block
    );
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item shortcut="⌘ C" onClick={() => copyBlock(block)}>
          Copy
        </ContextMenu.Item>
        <ContextMenu.Item
          shortcut="⌘ V"
          onClick={async (e) => {
            const text = await navigator.clipboard.readText();
            pasteBlock(text, block);
          }}
        >
          Paste
        </ContextMenu.Item>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Add</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item onClick={() => handleAddBlock("TEXT")}>
              <TextIcon width={16} height={16} /> Text
            </ContextMenu.Item>
            <ContextMenu.Item onClick={() => handleAddBlock("FRAME_CANVAS")}>
              <FrameIcon width={16} height={16} /> Frame
            </ContextMenu.Item>
            <ContextMenu.Item onClick={() => handleAddBlock("IMAGE")}>
              <ImageIcon width={16} height={16} /> Image
            </ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Item shortcut="⌫" color="red" onClick={() => deleteBlock(block)}>
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

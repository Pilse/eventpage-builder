import { useState } from "react";
import { useDragLayer } from "react-dnd";
import { Block, SectionBlock, BlockFactory } from "@/domain/block";
import { SNAP_THRESHOLD } from "@/constant";

interface IUseSectionPreviewBlockProps {
  section: InstanceType<typeof SectionBlock>;
  element: HTMLElement | null;
}

interface IUseSectionPreviewBlock {
  previewBlock: InstanceType<typeof Block> | null;
}

export const useSectionPreviewBlock = (
  section: IUseSectionPreviewBlockProps["section"],
  element: IUseSectionPreviewBlockProps["element"]
): IUseSectionPreviewBlock => {
  const { draggedBlock, currentOffset } = useDragLayer((monitor) => ({
    draggedBlock: monitor.getItem<InstanceType<typeof Block> | null>(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  const [previewBlock, setPreviewBlock] = useState<InstanceType<typeof Block> | null>(draggedBlock);

  // 드래그가 끝난 경우
  if (!draggedBlock && previewBlock) {
    setPreviewBlock(null);
  }

  // 다른 섹션으로 드래그 하는 경우
  if (previewBlock && draggedBlock && !section.hasChlid(draggedBlock)) {
    setPreviewBlock(null);
  }

  // 같은 섹션에서 다른 부모 블록으로 드래그 하는 경우
  if (
    previewBlock &&
    draggedBlock &&
    draggedBlock.parent &&
    previewBlock.parent &&
    draggedBlock.parent.id !== previewBlock.parent.id
  ) {
    previewBlock.parent = draggedBlock.parent;
  }

  // 현재 섹션에서 드래그가 시작된 경우
  if (!previewBlock && draggedBlock && section.hasChlid(draggedBlock) && currentOffset && element) {
    const newItem = BlockFactory.deserialize(
      { ...draggedBlock.serialize(), draggable: false },
      draggedBlock.parent
    );
    const sectionDomRect = element.getBoundingClientRect();
    draggedBlock.updateDirection(currentOffset);
    newItem.updateDirection(currentOffset);
    newItem.updateCoords(currentOffset, sectionDomRect);
    setPreviewBlock(newItem);
  }

  // 드래그 중 포지션 업데이트
  if (previewBlock && draggedBlock && currentOffset && element) {
    const sectionDomRect = element.getBoundingClientRect();
    draggedBlock.updateDirection(currentOffset);
    previewBlock.updateDirection(currentOffset);
    previewBlock.updateCoords(currentOffset, sectionDomRect);
    const snappedCoords = section.getSnappedCoords(
      previewBlock,
      currentOffset,
      sectionDomRect,
      sectionDomRect,
      SNAP_THRESHOLD
    );
    previewBlock.updateCoords(snappedCoords, sectionDomRect);
  }

  return {
    previewBlock,
  };
};

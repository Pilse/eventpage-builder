import { useDragLayer } from "react-dnd";
import { Block, SectionBlock, SectionColBlock, SectionRowBlock } from "@/domain/builder";
import { useSectionPreviewBlock } from "./use-preview-block";
import { PreviewBlock } from "./preview-block";
import { DragSnapLineLayer } from "@/components/builder/layer";
import { isAutoLayouted } from "@/shared/util";

interface ISectionPreviewBlockProps {
  section:
    | InstanceType<typeof SectionBlock>
    | InstanceType<typeof SectionColBlock>
    | InstanceType<typeof SectionRowBlock>;
  element: HTMLElement | null;
}

export const SectionPreviewBlock = ({ section, element }: ISectionPreviewBlockProps) => {
  // 드래그 상태 확인
  const { isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging() && monitor.getItemType() === "BLOCK",
  }));

  // preview 로직 실행 (hook 규칙 준수)
  const { previewBlock, snappableDir } = useSectionPreviewBlock(section, element);

  // 드래그 중이 아니라면 아무것도 렌더링하지 않음
  if (!isDragging) {
    return null;
  }

  return (
    <>
      {previewBlock && !isAutoLayouted(previewBlock) && element && (
        <DragSnapLineLayer sectionElement={element} block={previewBlock} snappableDir={snappableDir} />
      )}
      {previewBlock && <PreviewBlock block={previewBlock} />}
    </>
  );
};

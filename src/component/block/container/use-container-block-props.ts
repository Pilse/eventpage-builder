import { ContainerBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useBlockHistory, useDefaultBlockProps, useGlobalContext } from "@/hooks";
import { hasChildrenMixin } from "@/util";
import { useHotkeys } from "react-hotkeys-hook";

interface IUseContainerBlockProps extends IUseDefaultBlockProps<InstanceType<typeof ContainerBlock>> {}

export const useContainerBlockProps = (
  containerBlock: InstanceType<typeof ContainerBlock>
): IUseContainerBlockProps => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const { block: container, ...props } = useDefaultBlockProps(containerBlock);

  const globalContext = useGlobalContext();

  useHotkeys("backspace", () => {
    const block = globalContext.currentBlock;
    if (!block) {
      return;
    }

    const parent = block.parent;
    if (parent && hasChildrenMixin(parent)) {
      startCaptureSnapshot(`remove-${parent.id}`);
      parent.removeChild(block);
      endCaptureSnapshot(`remove-${parent.id}`);
    }
  });

  return { block: container, ...props };
};

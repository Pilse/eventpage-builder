import { ContainerBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useDefaultBlockProps, useGlobalContext } from "@/hooks";
import { hasChildrenMixin } from "@/util";
import { useHotkeys } from "react-hotkeys-hook";

interface IUseContainerBlockProps extends IUseDefaultBlockProps<InstanceType<typeof ContainerBlock>> {}

export const useContainerBlockProps = (
  containerBlock: InstanceType<typeof ContainerBlock>
): IUseContainerBlockProps => {
  const { block: container, ...props } = useDefaultBlockProps(containerBlock);

  const globalContext = useGlobalContext();

  useHotkeys("backspace", () => {
    const block = globalContext.currentBlock;
    if (!block) {
      return;
    }

    const parent = block.parent;
    if (parent && hasChildrenMixin(parent)) {
      parent.removeChild(block);
    }
  });

  return { block: container, ...props };
};

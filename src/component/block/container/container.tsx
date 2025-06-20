import { ContainerBlock } from "@/domain/block";
import { IBlockProps } from "@/type";
import { useContainerBlockProps } from "./use-container-block-props";
import { ChildrenMixin, ResizeMixin } from "@/component/mixin";

interface IContainerProps extends IBlockProps<InstanceType<typeof ContainerBlock>> {}

export const Container = ({ block }: IContainerProps) => {
  const { block: container, element, setElement, isSelected, ...blockProps } = useContainerBlockProps(block);

  return (
    <>
      <main
        ref={(ele) => {
          setElement(ele);
        }}
        className="flex flex-col items-center justify-center mx-auto"
        {...blockProps}
      >
        {isSelected && element && <ResizeMixin element={element} block={container} />}
        {/* <DndProvider backend={HTML5Backend}> */}
        <ChildrenMixin block={container} />
        {/* </DndProvider> */}
      </main>
    </>
  );
};

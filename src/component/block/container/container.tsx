import { ContainerBlock } from "@/domain/block";
import { IBlockProps } from "@/type";
import { useContainerBlockProps } from "./use-container-block-props";
import { ChildrenMixin } from "@/component/mixin";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NewBlockButtons } from "./new-block-buttons";

interface IContainerProps extends IBlockProps<InstanceType<typeof ContainerBlock>> {}

export const Container = ({ block }: IContainerProps) => {
  const { block: container, element, setElement, isSelected, ...blockProps } = useContainerBlockProps(block);

  return (
    <>
      <NewBlockButtons />
      <main
        ref={(ele) => {
          setElement(ele);
        }}
        className="flex flex-col items-center justify-center"
        {...blockProps}
      >
        <DndProvider backend={HTML5Backend}>
          <ChildrenMixin block={container} />
        </DndProvider>
      </main>
    </>
  );
};

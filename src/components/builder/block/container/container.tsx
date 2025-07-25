import { ContainerBlock } from "@/domain/builder";
import { IBlockProps } from "@/type";
import { useContainerBlockProps } from "./use-container-block-props";
import { ChildrenMixin } from "@/components/builder/mixin";

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
        <ChildrenMixin block={container} />
      </main>
    </>
  );
};

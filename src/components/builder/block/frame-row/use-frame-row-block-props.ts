import { FrameRowBlock } from "@/domain/builder";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseFrameRowBlockProps extends IUseDefaultBlockProps<InstanceType<typeof FrameRowBlock>> {}

export const useFrameRowBlockProps = (
  frameBlock: InstanceType<typeof FrameRowBlock>
): IUseFrameRowBlockProps => {
  return useDefaultBlockProps(frameBlock);
};

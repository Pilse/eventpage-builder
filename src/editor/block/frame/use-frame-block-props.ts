import { FrameBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseFrameBlockProps extends IUseDefaultBlockProps<InstanceType<typeof FrameBlock>> {}

export const useFrameBlockProps = (frameBlock: InstanceType<typeof FrameBlock>): IUseFrameBlockProps => {
  return useDefaultBlockProps(frameBlock);
};

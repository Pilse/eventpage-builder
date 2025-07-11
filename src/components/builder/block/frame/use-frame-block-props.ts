import { FrameBlock } from "@/domain/builder";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseFrameBlockProps extends IUseDefaultBlockProps<InstanceType<typeof FrameBlock>> {}

export const useFrameBlockProps = (frameBlock: InstanceType<typeof FrameBlock>): IUseFrameBlockProps => {
  return useDefaultBlockProps(frameBlock);
};

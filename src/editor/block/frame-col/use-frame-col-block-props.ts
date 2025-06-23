import { FrameColBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseFrameColBlockProps extends IUseDefaultBlockProps<InstanceType<typeof FrameColBlock>> {}

export const useFrameColBlockProps = (
  frameBlock: InstanceType<typeof FrameColBlock>
): IUseFrameColBlockProps => {
  return useDefaultBlockProps(frameBlock);
};

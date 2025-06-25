import { FrameColBlock } from "@/domain/builder";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseFrameColBlockProps extends IUseDefaultBlockProps<InstanceType<typeof FrameColBlock>> {}

export const useFrameColBlockProps = (
  frameBlock: InstanceType<typeof FrameColBlock>
): IUseFrameColBlockProps => {
  return useDefaultBlockProps(frameBlock);
};

import { TextBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseTextBlockProps extends IUseDefaultBlockProps<InstanceType<typeof TextBlock>> {}

export const useTextBlockProps = (frameBlock: InstanceType<typeof TextBlock>): IUseTextBlockProps => {
  return useDefaultBlockProps(frameBlock);
};

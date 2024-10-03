import { TextBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseTextBlockProps extends IUseDefaultBlockProps<InstanceType<typeof TextBlock>> {}

export const useTextBlockProps = (text: InstanceType<typeof TextBlock>): IUseTextBlockProps => {
  return useDefaultBlockProps(text);
};

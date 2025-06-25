import { ImageBlock } from "@/domain/builder";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseImageBlockProps extends IUseDefaultBlockProps<InstanceType<typeof ImageBlock>> {}

export const useImageBlockProps = (image: InstanceType<typeof ImageBlock>): IUseImageBlockProps => {
  const defaultProps = useDefaultBlockProps(image);

  return {
    ...defaultProps,
  };
};

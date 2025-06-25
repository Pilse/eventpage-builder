import { SectionBlock } from "@/domain/builder";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseSectionBlockProps extends IUseDefaultBlockProps<InstanceType<typeof SectionBlock>> {}

export const useSectionBlockProps = (
  sectionBlock: InstanceType<typeof SectionBlock>
): IUseSectionBlockProps => {
  return useDefaultBlockProps(sectionBlock);
};

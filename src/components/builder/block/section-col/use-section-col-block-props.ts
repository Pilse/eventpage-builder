import { SectionColBlock } from "@/domain/builder";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseSectionColBlockProps extends IUseDefaultBlockProps<InstanceType<typeof SectionColBlock>> {}

export const useSectionColBlockProps = (
  sectionColBlock: InstanceType<typeof SectionColBlock>
): IUseSectionColBlockProps => {
  return useDefaultBlockProps(sectionColBlock);
};

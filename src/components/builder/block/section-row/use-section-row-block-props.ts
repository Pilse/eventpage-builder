import { SectionRowBlock } from "@/domain/builder";
import { IUseDefaultBlockProps, useDefaultBlockProps } from "@/hooks";

interface IUseSectionRowBlockProps extends IUseDefaultBlockProps<InstanceType<typeof SectionRowBlock>> {}

export const useSectionRowBlockProps = (
  sectionRow: InstanceType<typeof SectionRowBlock>
): IUseSectionRowBlockProps => {
  return useDefaultBlockProps(sectionRow);
};

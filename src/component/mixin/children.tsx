import { ChildrenMixin as IChildrenMixin } from "@/domain/mixin";
import { BlockFactory } from "@/component/block";

interface IChildrenMixinProps {
  block: InstanceType<ReturnType<typeof IChildrenMixin>>;
}

export const ChildrenMixin = ({ block }: IChildrenMixinProps) => {
  return block.children.map((child) => <BlockFactory key={child.id} block={child} />);
};

import { ChildrenMixin as IChildrenMixin } from "@/domain/mixin";
import { BlockFactory } from "@/component/block";
import { useLayoutEffect } from "react";

interface IChildrenMixinProps {
  block: InstanceType<ReturnType<typeof IChildrenMixin>>;
}

export const ChildrenMixin = ({ block }: IChildrenMixinProps) => {
  // 자식 블록의 부모 블록을 proxy블록으로 교체
  useLayoutEffect(() => {
    block.children.forEach((child) => {
      if (child.parent !== block) {
        child.parent = block;
      }
    });
  }, [block]);

  return block.children.map((child) => <BlockFactory key={child.id} block={child} />);
};

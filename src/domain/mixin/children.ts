import { Block } from "@/domain/block";
import { Constructor } from "@/type";

export type ChildrenMixinBlockType = InstanceType<
  ReturnType<typeof ChildrenMixin<Constructor<Block & { children: Block[] }>>>
>;

export const ChildrenMixin = <TBase extends Constructor<Block & { children: InstanceType<typeof Block>[] }>>(
  Base: TBase
) => {
  return class extends Base {
    public placeable = true;

    constructor(...args: any[]) {
      super(...args);
    }

    public hasChlid(child: InstanceType<typeof Block>) {
      for (const block of this) {
        if (block.id === child.id) {
          return true;
        }
      }
      return false;
    }

    public addChild(child: InstanceType<typeof Block>) {
      this.children = this.children.concat(child);
    }

    public removeChild(child: InstanceType<typeof Block>) {
      this.children = this.children.filter((c) => c.id !== child.id);
    }

    public replaceChild(block: InstanceType<typeof Block>) {
      const idx = this.children.findIndex((child) => block.id === child.id);
      if (idx === -1) {
        return;
      }

      this.children.splice(idx, 1, block);
    }

    public findChild(block: InstanceType<typeof Block>) {
      return this.children.find((child) => child.id === block.id);
    }
  };
};

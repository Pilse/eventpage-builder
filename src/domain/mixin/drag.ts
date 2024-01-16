import { Block } from "@/domain/block";
import { Constructor } from "@/type";

export type DragMixinBlockType = InstanceType<ReturnType<typeof DragMixin<typeof Block>>>;

export const DragMixin = <TBase extends Constructor<Block>>(Base: TBase) => {
  return class extends Base {
    public draggable = true;

    constructor(...args: any[]) {
      super(...args);
    }
  };
};

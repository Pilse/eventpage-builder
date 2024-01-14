import { Block } from "@/domain/block";
import { Constructor } from "@/type";

export type DragdropMixinBlockType = InstanceType<ReturnType<typeof DragdropMixin<typeof Block>>>;

export const DragdropMixin = <TBase extends Constructor<Block>>(Base: TBase) => {
  return class extends Base {
    public draggable = true;

    constructor(...args: any[]) {
      super(...args);
    }
  };
};

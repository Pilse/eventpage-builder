import { SNAP_THRESHOLD } from "@/constant";
import { Block, BlockFactory } from "@/domain/block";
import { Constructor, Offset } from "@/type";
import { hasChildrenMixin, hasSnapMixin } from "@/util";

export type DropMixinBlockType = InstanceType<
  ReturnType<typeof DropMixin<Constructor<Block & { children: Block[] }>>>
>;

export const DropMixin = <TBase extends Constructor<Block & { children: InstanceType<typeof Block>[] }>>(
  Base: TBase
) => {
  return class extends Base {
    public droppable = true;

    constructor(...args: any[]) {
      super(...args);
    }

    public dropped(
      draggedBlock: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      thisOffset: Offset
    ) {
      if (draggedBlock.parent && draggedBlock.parent.id !== this.id) {
        const deserializedBlock = BlockFactory.deserialize(draggedBlock.serialize(), draggedBlock.parent);
        deserializedBlock.updateCoords(currentOffset, thisOffset);
        if (hasSnapMixin(this)) {
          this.snap(deserializedBlock, currentOffset, sectionOffset, thisOffset, SNAP_THRESHOLD);
        }

        if (hasChildrenMixin(this)) {
          this.addChild(deserializedBlock);
        }
        if (hasChildrenMixin(draggedBlock.parent)) {
          draggedBlock.parent.removeChild(draggedBlock);
        }
        return;
      }

      draggedBlock.updateCoords(currentOffset, thisOffset);
      if (hasSnapMixin(this)) {
        this.snap(draggedBlock, currentOffset, sectionOffset, thisOffset, SNAP_THRESHOLD);
      }
    }

    public hovered(hoveredBlock: InstanceType<typeof Block>) {
      if (!hoveredBlock.parent) {
        return;
      }

      if (
        hoveredBlock.parent.id !== this.id &&
        hasChildrenMixin(hoveredBlock.parent) &&
        hasChildrenMixin(this)
      ) {
        hoveredBlock.parent.removeChild(hoveredBlock);
        hoveredBlock.parent = this;
        this.addChild(hoveredBlock);
      }
    }
  };
};

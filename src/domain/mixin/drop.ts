import { SNAP_THRESHOLD } from "@/constant";
import { Block, BlockFactory } from "@/domain/block";
import { Constructor, LayoutMap, Offset } from "@/type";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";
import { ChildrenMixin, SnapMixin } from ".";

export type DropMixinBlockType = InstanceType<
  ReturnType<typeof DropMixin<Constructor<Block & { children: Block[]; getLayoutMap(): LayoutMap }>>>
>;

export const DropMixin = <
  TBase extends Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
>(
  Base: TBase
) => {
  return class extends SnapMixin(ChildrenMixin(Base)) {
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
        this.snap(deserializedBlock, currentOffset, sectionOffset, thisOffset, SNAP_THRESHOLD);
        this.addChild(deserializedBlock);

        if (hasChildrenMixin(draggedBlock.parent)) {
          draggedBlock.parent.removeChild(draggedBlock);
        }
        return;
      }

      draggedBlock.updateCoords(currentOffset, thisOffset);
      this.snap(draggedBlock, currentOffset, sectionOffset, thisOffset, SNAP_THRESHOLD);
    }

    public hovered(hoveredBlock: InstanceType<typeof Block>) {
      if (!hoveredBlock.parent) {
        return;
      }

      if (hoveredBlock.parent.id !== this.id && hasChildrenMixin(hoveredBlock.parent)) {
        hoveredBlock.parent.removeChild(hoveredBlock);
        if (hasDropRowMixin(hoveredBlock.parent) || hasDropColMixin(hoveredBlock.parent)) {
          hoveredBlock.parent.autoLayout();
        }

        hoveredBlock.parent = this;
        this.addChild(hoveredBlock);
      }
    }
  };
};

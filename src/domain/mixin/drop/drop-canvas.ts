import { SNAP_THRESHOLD } from "@/constant";
import { Block, BlockFactory } from "@/domain/block";
import { ChildrenMixin, DragSnapMixin, ResizeSnapMixin } from "@/domain/mixin";
import { Constructor, LayoutMap, Offset } from "@/type";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";

export type DropCanvasMixinBlockType = InstanceType<
  ReturnType<typeof DropCanvasMixin<Constructor<Block & { children: Block[]; getLayoutMap(): LayoutMap }>>>
>;

export const DropCanvasMixin = <
  TBase extends Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
>(
  Base: TBase
) => {
  return class extends DragSnapMixin(ChildrenMixin(Base)) {
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
        this.dragSnap(deserializedBlock, currentOffset, sectionOffset, thisOffset, SNAP_THRESHOLD);
        this.addChild(deserializedBlock);

        if (hasChildrenMixin(draggedBlock.parent)) {
          draggedBlock.parent.removeChild(draggedBlock);
        }
        return;
      }

      draggedBlock.updateCoords(currentOffset, thisOffset);
      this.dragSnap(draggedBlock, currentOffset, sectionOffset, thisOffset, SNAP_THRESHOLD);
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

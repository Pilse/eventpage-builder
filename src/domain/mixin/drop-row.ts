import { Block, BlockFactory } from "@/domain/block";
import { ChildrenMixin } from "@/domain/mixin";
import { Constructor, Offset } from "@/type";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";

export type DropRowMixinBlockType = InstanceType<
  ReturnType<typeof DropRowMixin<Constructor<Block & { children: Block[] }>>>
>;

export const DropRowMixin = <TBase extends Constructor<Block & { children: Block[] }>>(Base: TBase) => {
  return class extends ChildrenMixin(Base) {
    public rowDroppable = true;
    public childrenOffsetX: number[] = [0];

    constructor(...args: any[]) {
      super(...args);
      this.autoLayout();
    }

    public autoLayout() {
      this.childrenOffsetX = [0];
      this.children.sort((chlid1, child2) => chlid1.l - child2.l);
      this.children.forEach((child, idx) => {
        this.childrenOffsetX.push(this.childrenOffsetX[idx] + child.width);
        child.l = this.childrenOffsetX[idx];
        child.t = 0;
      });
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
        this.addChild(deserializedBlock);

        if (hasChildrenMixin(draggedBlock.parent)) {
          draggedBlock.parent.removeChild(draggedBlock);
        }
        return;
      }

      draggedBlock.updateCoords(currentOffset, thisOffset);
      this.autoLayout();
    }

    public hovered(hoveredBlock: InstanceType<typeof Block>, offsetFromFrameRow: Offset) {
      if (!hoveredBlock.parent) {
        return;
      }

      if (hoveredBlock.parent.id !== this.id && hasChildrenMixin(hoveredBlock.parent)) {
        hoveredBlock.parent.removeChild(hoveredBlock);
        if (hasDropRowMixin(hoveredBlock.parent) || hasDropColMixin(hoveredBlock.parent)) {
          hoveredBlock.parent.autoLayout();
        }

        hoveredBlock.parent = this;
        hoveredBlock.l = offsetFromFrameRow.x;
        this.addChild(hoveredBlock);
        this.autoLayout();
        return;
      }

      if (hoveredBlock.parent.id === this.id) {
        const idx = this.childrenOffsetX.findLastIndex((childOffetX) => childOffetX > offsetFromFrameRow.x);
        if (idx === -1) {
          return;
        }

        hoveredBlock.l = offsetFromFrameRow.x;

        if (this.children[idx]) {
          this.swapChildren(hoveredBlock, this.children[idx]);
        } else {
          this.swapChildren(hoveredBlock, this.children[idx - 1]);
        }

        this.autoLayout();
      }
    }
  };
};

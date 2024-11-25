import { Block, BlockFactory } from "@/domain/block";
import { ChildrenMixin, DragSnapMixin } from "@/domain/mixin";
import { Constructor, LayoutMap, Offset } from "@/type";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";

export type DropRowMixinBlockType = InstanceType<
  ReturnType<
    typeof DropRowMixin<
      Constructor<
        Block & {
          gap: number;
          children: Block[];
          alignVertical: "top" | "bottom" | "center";
          alignHorizontal: "left" | "right" | "center";
          getLayoutMap: () => LayoutMap;
        }
      >
    >
  >
>;

export const DropRowMixin = <
  TBase extends Constructor<
    Block & {
      gap: number;
      alignVertical: "top" | "bottom" | "center";
      alignHorizontal: "left" | "right" | "center";
      children: Block[];
      getLayoutMap: () => LayoutMap;
    }
  >
>(
  Base: TBase
) => {
  return class extends DragSnapMixin(ChildrenMixin(Base)) {
    public rowDroppable = true;
    public childrenOffsetX: number[] = [0];

    constructor(...args: any[]) {
      super(...args);
      this.autoLayout();
    }

    public autoLayout() {
      const childrenTotalWidth = this.children.reduce((acc, child, idx) => {
        return idx > 0 ? acc + child.width + this.gap : acc + child.width;
      }, 0);
      const initialL =
        this.alignHorizontal === "left"
          ? this.pl
          : this.alignHorizontal === "center"
          ? Math.floor((this.width - (this.pl + this.pr)) / 2) - Math.floor(childrenTotalWidth) / 2 + this.pl
          : this.width - this.pr - childrenTotalWidth;

      this.childrenOffsetX = [initialL];
      this.children.sort((chlid1, child2) => chlid1.l - child2.l);
      this.children.forEach((child, idx) => {
        this.childrenOffsetX.push(this.childrenOffsetX[idx] + child.width + this.gap);
        child.l = this.childrenOffsetX[idx];
        child.t =
          this.alignVertical === "top"
            ? this.pt
            : this.alignVertical === "center"
            ? Math.floor((this.height - (this.pt + this.pb)) / 2) - Math.floor(child.height / 2) + this.pt
            : this.height - this.pb - child.height;
      });

      if (
        this.parent &&
        (this.heightType === "fit" || this.widthType === "fit") &&
        (hasDropRowMixin(this.parent) || hasDropColMixin(this.parent))
      ) {
        this.parent.autoLayout();
      }
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

      this.autoLayout();
    }

    public hovered(hoveredBlock: InstanceType<typeof Block>, offsetFromThis: Offset) {
      if (!hoveredBlock.parent) {
        return;
      }

      if (hoveredBlock.parent.id !== this.id && hasChildrenMixin(hoveredBlock.parent)) {
        if (hoveredBlock.widthType === "fill") {
          hoveredBlock.widthType = "fixed";
        }

        if (hoveredBlock.heightType === "fill") {
          hoveredBlock.heightType = "fixed";
        }
        hoveredBlock.parent.removeChild(hoveredBlock);
        if (hasDropRowMixin(hoveredBlock.parent) || hasDropColMixin(hoveredBlock.parent)) {
          hoveredBlock.parent.autoLayout();
        }

        hoveredBlock.parent = this;
        hoveredBlock.l = offsetFromThis.x;
        this.addChild(hoveredBlock);
        this.autoLayout();
        return;
      }

      if (hoveredBlock.parent.id === this.id) {
        const idx = this.childrenOffsetX.findLastIndex((childOffetX) => childOffetX > offsetFromThis.x);
        if (idx === -1) {
          return;
        }

        hoveredBlock.l = offsetFromThis.x;

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

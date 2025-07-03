import { Block, BlockFactory } from "@/domain/builder";
import { ChildrenMixin, DragSnapMixin } from "@/domain/builder/mixin";
import { Constructor, LayoutMap, Offset } from "@/type";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/shared/util";

export type DropColMixinBlockType = InstanceType<
  ReturnType<
    typeof DropColMixin<
      Constructor<
        Block & {
          gap: number;
          alignVertical: "top" | "bottom" | "center";
          alignHorizontal: "left" | "right" | "center";
          children: Block[];
          getLayoutMap: () => LayoutMap;
        }
      >
    >
  >
>;

export const DropColMixin = <
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
    public colDroppable = true;
    public childrenOffsetY: number[] = [0];

    constructor(...args: any[]) {
      super(...args);
      this.autoLayout();
    }

    public autoLayout(sort: "order" | "posY" = "posY") {
      const childrenTotalHeight = this.children.reduce((acc, child, idx) => {
        return idx > 0 ? acc + child.height + this.gap : acc + child.height;
      }, 0);
      const initialT =
        this.alignVertical === "top"
          ? this.pt
          : this.alignVertical === "center"
          ? Math.floor((this.height - (this.pt + this.pb)) / 2) -
            Math.floor(childrenTotalHeight) / 2 +
            this.pt
          : this.height - this.pb - childrenTotalHeight;

      this.childrenOffsetY = [initialT];
      this.children.forEach((child, idx) => {
        this.childrenOffsetY.push(this.childrenOffsetY[idx] + child.height + this.gap);
        child.t = this.childrenOffsetY[idx];
        child.l =
          this.alignHorizontal === "left"
            ? this.pl
            : this.alignHorizontal === "center"
            ? Math.floor((this.width - (this.pl + this.pr)) / 2) - Math.floor(child.width / 2) + this.pl
            : this.width - this.pr - child.width;
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
        hoveredBlock.t = offsetFromThis.y;
        this.addChild(hoveredBlock);
        this.autoLayout();
        return;
      }

      if (hoveredBlock.parent.id === this.id) {
        const idx = this.getHoveredOffsetIdx(hoveredBlock, offsetFromThis);
        if (idx === -1) {
          return;
        }

        hoveredBlock.t = offsetFromThis.y;

        if (this.children[idx]) {
          this.swapChildren(hoveredBlock, this.children[idx]);
          this.autoLayout("order");
        } else if (this.children[idx - 1]) {
          this.swapChildren(hoveredBlock, this.children[idx - 1]);
          this.autoLayout("order");
        }
      }
    }

    private getHoveredOffsetIdx(hoveredBlock: InstanceType<typeof Block>, offsetFromThis: Offset) {
      const hoveredBlockIdx = this.findChildIdx(hoveredBlock);
      if (hoveredBlockIdx === -1) {
        return -1;
      }

      const compareTargetBlockIdx =
        hoveredBlock.yDirection === "b" ? hoveredBlockIdx + 1 : hoveredBlockIdx - 1;
      const compareTargetBlock = this.children[compareTargetBlockIdx];
      if (!compareTargetBlock) {
        return -1;
      }

      if (hoveredBlock.yDirection === "b") {
        const offset =
          this.childrenOffsetY[compareTargetBlockIdx] + this.children[compareTargetBlockIdx].height / 2;
        if (offsetFromThis.y > offset) {
          return compareTargetBlockIdx;
        }
      } else if (hoveredBlock.yDirection === "t") {
        const offset =
          this.childrenOffsetY[compareTargetBlockIdx] + this.children[compareTargetBlockIdx].height / 2;
        if (offsetFromThis.y < offset) {
          return compareTargetBlockIdx;
        }
      }
      return -1;
    }
  };
};

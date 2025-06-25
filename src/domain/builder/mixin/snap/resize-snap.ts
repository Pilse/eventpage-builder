import { Block } from "@/domain/builder";
import { hasDragSnapMixin } from "@/util";
import { Constructor, LayoutMap, Offset } from "@/type";
import { SnapBaseMixin } from "./snap-base";

export type ResizeSnapMixinBlockType = InstanceType<
  ReturnType<
    typeof ResizeSnapMixin<
      Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
    >
  >
>;

export const ResizeSnapMixin = <
  TBase extends Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
>(
  Base: TBase
) => {
  return class extends SnapBaseMixin(Base) {
    public resizeSnappable = true;

    constructor(...args: any[]) {
      super(...args);
    }

    private getAdjecentBlockPositionForResizeSnap(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset
    ) {
      if (!block.parent || !hasDragSnapMixin(block.parent)) {
        throw new Error("block is not in snappable parent");
      }

      const layoutMap = this.removeSelectedBlockLayouts(block.parent.getLayoutMap(), block);
      const currentOffsetFromSection = {
        x: currentOffset.x - sectionOffset.x,
        y: currentOffset.y - sectionOffset.y,
      };

      const xRes =
        block.xDirection === "r"
          ? { value: this.getSnappedRX(layoutMap, currentOffsetFromSection, block), snappedTo: "r" as const }
          : { value: this.getSnappedLX(layoutMap, currentOffsetFromSection), snappedTo: "l" as const };
      const yRes =
        block.yDirection === "b"
          ? { value: this.getSnappedBY(layoutMap, currentOffsetFromSection, block), snappedTo: "b" as const }
          : { value: this.getSnappedTY(layoutMap, currentOffsetFromSection), snappedTo: "t" as const };

      return { xRes, yRes };
    }

    private getResizeSnappedCoords(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0
    ) {
      const { xRes, yRes } = this.getAdjecentBlockPositionForResizeSnap(block, currentOffset, sectionOffset);
      const parentOffsetFromSection = {
        x: parentOffset.x - sectionOffset.x,
        y: parentOffset.y - sectionOffset.y,
      };

      const canSnapToX = Math.abs(xRes.value - (parentOffsetFromSection.x + block.l)) < threshhold;
      const canSnapToY = Math.abs(yRes.value - (parentOffsetFromSection.y + block.t)) < threshhold;

      return {
        snappedToX: canSnapToX ? xRes.snappedTo : false,
        snappedToY: canSnapToY ? yRes.snappedTo : false,
        x: canSnapToX ? sectionOffset.x + xRes.value : parentOffset.x + block.l,
        y: canSnapToY ? sectionOffset.y + yRes.value : parentOffset.y + block.t,
      };
    }

    public resizeSnap(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0
    ) {
      const { snappedToX, snappedToY, ...snappedCoords } = this.getResizeSnappedCoords(
        block,
        currentOffset,
        sectionOffset,
        parentOffset,
        threshhold
      );

      if (snappedToY === "t") {
        block.height -= snappedCoords.y - parentOffset.y - block.t;
        block.t = snappedCoords.y - parentOffset.y;
      }
      if (snappedToY === "b") {
        block.height += snappedCoords.y - parentOffset.y - block.t;
      }
      if (snappedToX === "l") {
        block.width -= snappedCoords.x - parentOffset.x - block.l;
        block.l = snappedCoords.x - parentOffset.x;
      }
      if (snappedToX === "r") {
        block.width += snappedCoords.x - parentOffset.x - block.l;
      }

      return { snappedToX, snappedToY };
    }
  };
};

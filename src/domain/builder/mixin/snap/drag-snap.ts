import { Block } from "@/domain/builder";
import { hasDragSnapMixin } from "@/util";
import { Constructor, LayoutMap, Offset } from "@/type";
import { SnapBaseMixin } from "./snap-base";

export type DragSnapMixinBlockType = InstanceType<
  ReturnType<
    typeof DragSnapMixin<
      Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
    >
  >
>;

export const DragSnapMixin = <
  TBase extends Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
>(
  Base: TBase
) => {
  return class extends SnapBaseMixin(Base) {
    public dragSnappable = true;

    constructor(...args: any[]) {
      super(...args);
    }

    private getAdjecentBlockPositionForDragSnap(
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
          ? this.getSnappedRCX(layoutMap, currentOffsetFromSection, block)
          : this.getSnappedLCX(layoutMap, currentOffsetFromSection, block);
      const yRes =
        block.yDirection === "b"
          ? this.getSnappedBCY(layoutMap, currentOffsetFromSection, block)
          : this.getSnappedTCY(layoutMap, currentOffsetFromSection, block);

      return { xRes, yRes };
    }

    private getDragSnappedCoords(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0
    ) {
      const { xRes, yRes } = this.getAdjecentBlockPositionForDragSnap(block, currentOffset, sectionOffset);
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

    public dragSnap(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0
    ) {
      const { snappedToX, snappedToY, ...snappedCoords } = this.getDragSnappedCoords(
        block,
        currentOffset,
        sectionOffset,
        parentOffset,
        threshhold
      );

      block.updateCoords(snappedCoords, parentOffset);

      return { snappedToX, snappedToY };
    }
  };
};

import { Block } from "@/domain/block";
import { hasSnapMixin } from "@/util";
import { Constructor, LayoutMap, Offset } from "@/type";

export type SnapMixinBlockType = InstanceType<
  ReturnType<
    typeof SnapMixin<
      Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
    >
  >
>;

export const SnapMixin = <
  TBase extends Constructor<Block & { children: InstanceType<typeof Block>[]; getLayoutMap(): LayoutMap }>
>(
  Base: TBase
) => {
  return class extends Base {
    public snappable = true;

    constructor(...args: any[]) {
      super(...args);
    }

    private removeSelectedBlockLayouts(layoutMap: LayoutMap, block: InstanceType<typeof Block>) {
      const copiedlayoutMap = { ...layoutMap };
      Block.traverse(block, {
        beforeTraverse: (block) => {
          delete copiedlayoutMap[block.id];
        },
      });
      return copiedlayoutMap;
    }

    private getSnappedRX(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetX = currentOffsetFromSection.x + block.width;

      return (
        Object.values(layoutMap).reduce((adjecentX, pos) => {
          if (Math.abs(offsetX - pos.l) < Math.abs(offsetX - adjecentX)) {
            adjecentX = pos.l;
          }

          if (Math.abs(offsetX - (pos.l + pos.width)) < Math.abs(offsetX - adjecentX)) {
            adjecentX = pos.l + pos.width;
          }

          if (Math.abs(offsetX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetX - adjecentX)) {
            adjecentX = pos.l + Math.floor(pos.width / 2);
          }
          return adjecentX;
        }, Math.max()) - block.width
      );
    }

    private getSnappedLX(layoutMap: LayoutMap, currentOffsetFromSection: Offset) {
      const offsetX = currentOffsetFromSection.x;

      return Object.values(layoutMap).reduce((adjecentX, pos) => {
        if (Math.abs(offsetX - pos.l) < Math.abs(offsetX - adjecentX)) {
          adjecentX = pos.l;
        }

        if (Math.abs(offsetX - (pos.l + pos.width)) < Math.abs(offsetX - adjecentX)) {
          adjecentX = pos.l + pos.width;
        }

        if (Math.abs(offsetX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetX - adjecentX)) {
          adjecentX = pos.l + Math.floor(pos.width / 2);
        }

        return adjecentX;
      }, Math.max());
    }

    private getSnappedBY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetY = currentOffsetFromSection.y + block.height;

      return (
        Object.values(layoutMap).reduce((adjecentY, pos) => {
          if (Math.abs(offsetY - pos.t) < Math.abs(offsetY - adjecentY)) {
            adjecentY = pos.t;
          }

          if (Math.abs(offsetY - (pos.t + pos.height)) < Math.abs(offsetY - adjecentY)) {
            adjecentY = pos.t + pos.height;
          }

          if (Math.abs(offsetY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetY - adjecentY)) {
            adjecentY = pos.t + Math.floor(pos.height / 2);
          }

          return adjecentY;
        }, Math.max()) - block.height
      );
    }

    private getSnappedTY(layoutMap: LayoutMap, currentOffsetFromSection: Offset) {
      const offsetY = currentOffsetFromSection.y;

      return Object.values(layoutMap).reduce((adjecentY, pos) => {
        if (Math.abs(offsetY - pos.t) < Math.abs(offsetY - adjecentY)) {
          adjecentY = pos.t;
        }

        if (Math.abs(offsetY - (pos.t + pos.height)) < Math.abs(offsetY - adjecentY)) {
          adjecentY = pos.t + pos.height;
        }

        if (Math.abs(offsetY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetY - adjecentY)) {
          adjecentY = pos.t + Math.floor(pos.height / 2);
        }

        return adjecentY;
      }, Math.max());
    }

    private getAdjecentBlockPosition(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset
    ) {
      if (!block.parent || !hasSnapMixin(block.parent)) {
        throw new Error("block is not in snappable parent");
      }

      const layoutMap = this.removeSelectedBlockLayouts(block.parent.getLayoutMap(), block);
      const currentOffsetFromSection = {
        x: currentOffset.x - sectionOffset.x,
        y: currentOffset.y - sectionOffset.y,
      };
      const x =
        block.xDirection === "r"
          ? this.getSnappedRX(layoutMap, currentOffsetFromSection, block)
          : this.getSnappedLX(layoutMap, currentOffsetFromSection);
      const y =
        block.yDirection === "b"
          ? this.getSnappedBY(layoutMap, currentOffsetFromSection, block)
          : this.getSnappedTY(layoutMap, currentOffsetFromSection);
      return { x, y };
    }

    private getSnappedCoords(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0
    ) {
      const adjecentOffsetFromSection = this.getAdjecentBlockPosition(block, currentOffset, sectionOffset);
      const parentOffsetFromSection = {
        x: parentOffset.x - sectionOffset.x,
        y: parentOffset.y - sectionOffset.y,
      };
      const canSnapToX =
        Math.abs(adjecentOffsetFromSection.x - (parentOffsetFromSection.x + block.l)) < threshhold;
      const canSnapToY =
        Math.abs(adjecentOffsetFromSection.y - (parentOffsetFromSection.y + block.t)) < threshhold;

      return {
        snappedToX: canSnapToX,
        snappedToY: canSnapToY,
        x: canSnapToX ? sectionOffset.x + adjecentOffsetFromSection.x : parentOffset.x + block.l,
        y: canSnapToY ? sectionOffset.y + adjecentOffsetFromSection.y : parentOffset.y + block.t,
      };
    }

    public snap(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0
    ) {
      const { snappedToX, snappedToY, ...snappedCoords } = this.getSnappedCoords(
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

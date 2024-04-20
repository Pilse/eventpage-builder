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
      const offsetRX = currentOffsetFromSection.x + block.width;

      return (
        Object.values(layoutMap).reduce((adjecentX, pos) => {
          if (Math.abs(offsetRX - pos.l) < Math.abs(offsetRX - adjecentX)) {
            adjecentX = pos.l;
          }

          if (Math.abs(offsetRX - (pos.l + pos.width)) < Math.abs(offsetRX - adjecentX)) {
            adjecentX = pos.l + pos.width;
          }

          if (Math.abs(offsetRX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetRX - adjecentX)) {
            adjecentX = pos.l + Math.floor(pos.width / 2);
          }
          return adjecentX;
        }, Math.max()) - block.width
      );
    }

    private getSnappedRCX(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetCX = currentOffsetFromSection.x + Math.floor(block.width / 2);

      const rx = this.getSnappedRX(layoutMap, currentOffsetFromSection, block);
      const cx =
        Object.values(layoutMap).reduce((adjecentX, pos) => {
          if (Math.abs(offsetCX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetCX - adjecentX)) {
            adjecentX = pos.l + Math.floor(pos.width / 2);
          }
          return adjecentX;
        }, Math.max()) - Math.floor(block.width / 2);

      return Math.abs(rx - currentOffsetFromSection.x) < Math.abs(cx - currentOffsetFromSection.x)
        ? { snappedTo: "r" as const, value: rx }
        : { snappedTo: "c" as const, value: cx };
    }

    private getSnappedLX(layoutMap: LayoutMap, currentOffsetFromSection: Offset) {
      const offsetLX = currentOffsetFromSection.x;

      return Object.values(layoutMap).reduce((adjecentX, pos) => {
        if (Math.abs(offsetLX - pos.l) < Math.abs(offsetLX - adjecentX)) {
          adjecentX = pos.l;
        }

        if (Math.abs(offsetLX - (pos.l + pos.width)) < Math.abs(offsetLX - adjecentX)) {
          adjecentX = pos.l + pos.width;
        }

        if (Math.abs(offsetLX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetLX - adjecentX)) {
          adjecentX = pos.l + Math.floor(pos.width / 2);
        }

        return adjecentX;
      }, Math.max());
    }

    private getSnappedLCX(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetCX = currentOffsetFromSection.x + Math.floor(block.width / 2);

      const lx = this.getSnappedLX(layoutMap, currentOffsetFromSection);
      const cx =
        Object.values(layoutMap).reduce((adjecentX, pos) => {
          if (Math.abs(offsetCX - (pos.l + Math.floor(pos.width / 2))) < Math.abs(offsetCX - adjecentX)) {
            adjecentX = pos.l + Math.floor(pos.width / 2);
          }

          return adjecentX;
        }, Math.max()) - Math.floor(block.width / 2);

      return Math.abs(lx - currentOffsetFromSection.x) < Math.abs(cx - currentOffsetFromSection.x)
        ? { snappedTo: "l" as const, value: lx }
        : { snappedTo: "c" as const, value: cx };
    }

    private getSnappedBY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetBY = currentOffsetFromSection.y + block.height;

      return (
        Object.values(layoutMap).reduce((adjecentY, pos) => {
          if (Math.abs(offsetBY - pos.t) < Math.abs(offsetBY - adjecentY)) {
            adjecentY = pos.t;
          }

          if (Math.abs(offsetBY - (pos.t + pos.height)) < Math.abs(offsetBY - adjecentY)) {
            adjecentY = pos.t + pos.height;
          }

          if (Math.abs(offsetBY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetBY - adjecentY)) {
            adjecentY = pos.t + Math.floor(pos.height / 2);
          }

          return adjecentY;
        }, Math.max()) - block.height
      );
    }

    private getSnappedBCY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetCY = currentOffsetFromSection.y + Math.floor(block.height / 2);

      const by = this.getSnappedBY(layoutMap, currentOffsetFromSection, block);
      const cy =
        Object.values(layoutMap).reduce((adjecentY, pos) => {
          if (Math.abs(offsetCY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetCY - adjecentY)) {
            adjecentY = pos.t + Math.floor(pos.height / 2);
          }

          return adjecentY;
        }, Math.max()) - Math.floor(block.height / 2);

      return Math.abs(by - currentOffsetFromSection.y) < Math.abs(cy - currentOffsetFromSection.y)
        ? { snappedTo: "b" as const, value: by }
        : { snappedTo: "c" as const, value: cy };
    }

    private getSnappedTY(layoutMap: LayoutMap, currentOffsetFromSection: Offset) {
      const offsetTY = currentOffsetFromSection.y;

      return Object.values(layoutMap).reduce((adjecentY, pos) => {
        if (Math.abs(offsetTY - pos.t) < Math.abs(offsetTY - adjecentY)) {
          adjecentY = pos.t;
        }

        if (Math.abs(offsetTY - (pos.t + pos.height)) < Math.abs(offsetTY - adjecentY)) {
          adjecentY = pos.t + pos.height;
        }

        if (Math.abs(offsetTY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetTY - adjecentY)) {
          adjecentY = pos.t + Math.floor(pos.height / 2);
        }

        return adjecentY;
      }, Math.max());
    }

    private getSnappedTCY(
      layoutMap: LayoutMap,
      currentOffsetFromSection: Offset,
      block: InstanceType<typeof Block>
    ) {
      const offsetCY = currentOffsetFromSection.y + Math.floor(block.height / 2);

      const ty = this.getSnappedTY(layoutMap, currentOffsetFromSection);
      const cy =
        Object.values(layoutMap).reduce((adjecentY, pos) => {
          if (Math.abs(offsetCY - (pos.t + Math.floor(pos.height / 2))) < Math.abs(offsetCY - adjecentY)) {
            adjecentY = pos.t + Math.floor(pos.height / 2);
          }

          return adjecentY;
        }, Math.max()) - Math.floor(block.height / 2);

      return Math.abs(ty - currentOffsetFromSection.y) < Math.abs(cy - currentOffsetFromSection.y)
        ? { snappedTo: "t" as const, value: ty }
        : { snappedTo: "c" as const, value: cy };
    }

    private getAdjecentBlockPosition(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      useCenterCoords: boolean
    ) {
      if (!block.parent || !hasSnapMixin(block.parent)) {
        throw new Error("block is not in snappable parent");
      }

      const layoutMap = this.removeSelectedBlockLayouts(block.parent.getLayoutMap(), block);
      const currentOffsetFromSection = {
        x: currentOffset.x - sectionOffset.x,
        y: currentOffset.y - sectionOffset.y,
      };

      const xRes =
        block.xDirection === "r"
          ? useCenterCoords
            ? this.getSnappedRCX(layoutMap, currentOffsetFromSection, block)
            : {
                value: this.getSnappedRX(layoutMap, currentOffsetFromSection, block),
                snappedTo: "r" as const,
              }
          : useCenterCoords
          ? this.getSnappedLCX(layoutMap, currentOffsetFromSection, block)
          : { value: this.getSnappedLX(layoutMap, currentOffsetFromSection), snappedTo: "l" as const };
      const yRes =
        block.yDirection === "b"
          ? useCenterCoords
            ? this.getSnappedBCY(layoutMap, currentOffsetFromSection, block)
            : {
                value: this.getSnappedBY(layoutMap, currentOffsetFromSection, block),
                snappedTo: "b" as const,
              }
          : useCenterCoords
          ? this.getSnappedTCY(layoutMap, currentOffsetFromSection, block)
          : { value: this.getSnappedTY(layoutMap, currentOffsetFromSection), snappedTo: "t" as const };

      return { xRes, yRes };
    }

    private getSnappedCoords(
      block: InstanceType<typeof Block>,
      currentOffset: Offset,
      sectionOffset: Offset,
      parentOffset: Offset,
      threshhold: number = 0,
      useCenterCoords: boolean
    ) {
      const { xRes, yRes } = this.getAdjecentBlockPosition(
        block,
        currentOffset,
        sectionOffset,
        useCenterCoords
      );
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
        threshhold,
        true
      );

      block.updateCoords(snappedCoords, parentOffset);

      return { snappedToX, snappedToY };
    }

    public resizeSnap(
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
        threshhold,
        false
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
